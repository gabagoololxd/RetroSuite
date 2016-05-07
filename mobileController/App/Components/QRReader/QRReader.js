const React = require('react-native');
const Camera = require('react-native-camera').default;
const _ = require('lodash');
const Orientation = require('react-native-orientation');
const Permissions = require('react-native-permissions');

const DisconnectedModal = require('./DisconnectedModal');
const FocusBrackets = require('./FocusBrackets');
const DarkOverlays = require('./DarkOverlays');
const FlashButtonArea = require('./FlashButtonArea');
const CameraPermissionsModal = require('./CameraPermissionsModal');
const PairingInstructions = require('./PairingInstructions');
const SegmentedControl = require('./SegmentedControl');
const WifiConnectedPairingErrorModal = require('./WifiConnectedPairingErrorModal');
const WifiDisconnectedPairingErrorModal = require('./WifiDisconnectedPairingErrorModal');

const webSocket = require('../../Utils/webSocketMethods');
const JoyPadContainer = require('../JoyPad/JoyPadContainer');

const {
  Dimensions,
  StyleSheet,
  View,
  Navigator,
  StatusBarIOS,
  Linking,
  NetInfo,
  AppStateIOS,
  Animated,
  AlertIOS
} = React;

// On the iPhone 6+, if the app is launched in landscape, Dimensions.get('window').width returns the height and vice versa for width so we fix that here
var windowWidth, windowHeight;
if (Dimensions.get('window').width===736) { // iPhone 6+ landscape
  windowWidth = 414;
  windowHeight = 736;
} else if(Dimensions.get('window').width===667) { // iPhone 6 landscape
  windowWidth = 375;
  windowHeight = 667;
} else if(Dimensions.get('window').width===568) { // iPhone 5 landscape
  windowWidth = 320;
  windowHeight = 568;
} else { // launched in correct orientation
  windowWidth = Dimensions.get('window').width;
  windowHeight = Dimensions.get('window').height;
}

// This is the container component that holds the camera component and all the associated methods
class QRReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      appState: undefined,
      cameraPermissions: false,

      showCameraPermissionsModal: false,

      cameraOn: true,
      cameraTorchToggle: Camera.constants.TorchMode.off,
      handleFocusChanged: () => {},

      selectedIndex: 1,
      
      showDisconnectedModal: false,
      fadeAnim: new Animated.Value(0),

      ipAddressFound: undefined,
      connectionInfo: undefined,

      showWifiConnectedPairingErrorModal: false,
      showWifiDisconnectedPairingErrorModal: false
    };
    global.webSocketAlreadyConnected = false;
  }

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    AppStateIOS.addEventListener('change', this._handleAppStateChange.bind(this)); 

    // Determine user permissions for the camera; if permission is authorized, use the camera/app; 
    // Otherwise, notify the user that they must allow camera access and provide a link to settings where they can do so
    this._checkCameraPermissions();
    
    // //for development purposes, simulates successful qr scan
    // const openJoyPadContainerCallback = () => {
    //   const navigator = this.props.navigator;
    //   const _turnCameraOn = this._turnCameraOn.bind(this);
    //   const _turnCameraOff = this._turnCameraOff.bind(this);

    //   const _showDisconnectedModal = this._showDisconnectedModal.bind(this);

    //   _turnCameraOff();
    //   //open up the JoyPadContainer
    //   navigator.push({
    //     component: JoyPadContainer,
    //     _turnCameraOn: _turnCameraOn.bind(this),
    //     _showDisconnectedModal: _showDisconnectedModal.bind(this),
    //     sceneConfig: {
    //       ...Navigator.SceneConfigs.FloatFromBottom,
    //       gestures: {} //disable ability to swipe to pop back from JoyPadContainer to QRReader once past the ip address page
    //     }
    //   });
    // }
    // global.JoyPadOpen = true;
    // webSocket.PairController('10.0.0.215:1337', openJoyPadContainerCallback);

  }

  componentWillUnmount() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  _handleAppStateChange(currentAppState) {
    this.setState({ appState : currentAppState });
    // Check camera permissions again if the user switched away and came back to the app
    // handles edge case where user clicks "Yes" button, but doesn't actually give permissions, then comes back to the app
    if(currentAppState==='active') {
      this._checkCameraPermissions();
    }
  }

  _checkCameraPermissions() {
    Permissions.cameraPermissionStatus()
      .then(response => {
        if (response == Permissions.StatusUndetermined) {
          this.setState({
            cameraPermissions: undefined,
            showCameraPermissionsModal: false,
          });
          console.log("Undetermined");
        } else if (response == Permissions.StatusDenied) {
          this.setState({
            cameraPermissions: false,
            showCameraPermissionsModal: true,
          });
          console.log("Denied");
        } else if (response == Permissions.StatusAuthorized) {
          this.setState({
            cameraPermissions: true,
            showCameraPermissionsModal: false,
          });
          console.log("Authorized");
        } else if (response == Permissions.StatusRestricted) {
          this.setState({
            cameraPermissions: false,
            showCameraPermissionsModal: true,
          });
          console.log("Restricted");
        }
      });
  }

  _onBarCodeRead(e) {
    const ipAddress = e.data;
    console.log('scanned a qr', ipAddress);

    const self = this;

    const success = (resolveCallback) => {
      // resolve the promise from pairController
      resolveCallback();

      // reset ipAddressFound so when we pop back to the QRReader, we can scan the same QR again
      self.setState({ipAddressFound: undefined})

      const navigator = this.props.navigator;
      const _turnCameraOn = this._turnCameraOn.bind(this);
      const _turnCameraOff = this._turnCameraOff.bind(this);
      const _showDisconnectedModal = this._showDisconnectedModal.bind(this);

      // turn the camera off when the JoyPad is mounted
      _turnCameraOff();

      //open up the JoyPadContainer
      navigator.push({
        component: JoyPadContainer,
        _turnCameraOn: _turnCameraOn.bind(this),
        _showDisconnectedModal: _showDisconnectedModal.bind(this),
        sceneConfig: {
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {} //disable ability to swipe to pop back from JoyPadContainer to QRReader once past the ip address page
        }
      });
      global.JoyPadOpen = true; //set JoyPadOpen to true so that global.onClose will pop JoyPadContainer off back to QRReader
    }
    
    // if the QR just scanned is not the one that was just scanned, then send a pairing request to the websocket server
    // this is done because otherwise the QRReader would scan multiple times and send multiple unecessary requests within a few seconds,
    // and cause navigator to push JoyPadContainer multiple times
    if(this.state.ipAddressFound !== ipAddress) {
      
      console.log('attempt to pair')

      // remember the ipAddress that was just scanned so we can compare the next ipAddress scanned; 
      // if its is the same one again, don't send another pairing request
      this.setState({ipAddressFound: ipAddress})
      
      // see if the phone is connected to wifi or not; 
      // this is preparation for showing a possible error message if the pairing request is unsuccessful
      NetInfo.fetch().done(
        (connectionInfo) => { self.setState({connectionInfo: connectionInfo}) }
      );

      // Promise race, if after 1.5 seconds it doesnt pair successfully, check to see if connected to wifi, 
      // if it is not, then notify the user
      // if wifi is on but still can't pair, tell the user it tried to pair but still didn't work
      const pairController = new Promise(function (resolve, reject) {
        const resolveCallback = () => {
          resolve('paired');
        };
        webSocket.PairController(ipAddress, success, resolveCallback);
      }); 

      const showPairError = new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('did not pair');
        }, 1500);
      });

      const p = Promise.race([
        pairController,
        showPairError
      ])
      p.then((response) => {
        if(response=='did not pair') {
          if(self.state.connectionInfo==='wifi') {
            // The controller didn't pair, even though the phone is connected to wifi
            self.setState({showWifiConnectedPairingErrorModal: true});
          } else {
            // The controller didn't pair, and the phone is not connected to wifi
            self.setState({showWifiDisconnectedPairingErrorModal: true});
          }
        }
      })
      p.catch(error => console.log(error))
    };

    // TODO:
    // ABXY overlap / touch radius options

    // Nice to have:
      // somehow send  close message immediatedly when chrome app x's out
      // autofocus camera
  }

  _torchEnabled() {
    this.state.cameraTorchToggle === Camera.constants.TorchMode.on ? this.setState({ cameraTorchToggle: Camera.constants.TorchMode.off }) : this.setState({ cameraTorchToggle: Camera.constants.TorchMode.on });
  }

  _turnCameraOff() { //we want to turn the camera off once the JoyPadContainer mounts because the camera is no longer necessary (until the user has to re-pair with the websockets server)
    this.setState({cameraOn:false})
  }
  _turnCameraOn() {
    this.setState({cameraOn:true})
  }

  _showDisconnectedModal() {
    Animated.timing(this.state.fadeAnim, {duration: 500, toValue: 1}).start(); 
    this.setState({showDisconnectedModal:true});

    setTimeout(() => {
      Animated.timing(this.state.fadeAnim, {duration: 750, toValue: 0}).start(); 
    }, 2000);

    var self = this;
    setTimeout(() => {
      self._hideDisconnectedModal();
    }, 3000);
  }

  _hideDisconnectedModal() {
    this.setState({showDisconnectedModal:false});
  }

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }

  _openCameraPermissions() {
    this.setState({showCameraPermissionsModal: false});
    Linking.openURL('app-settings:').catch(err => console.error('An error occurred', err));
  }

  _openWifiPermissions() {
    this.setState({showWifiDisconnectedPairingErrorModal: false});
    this.setState({showWifiConnectedPairingErrorModal: false});
    Linking.openURL('prefs:root=WIFI').catch(err => console.error('An error occurred', err));
  }

  _closePairingErrorModal() {
    console.log('close click')
    this.setState({showWifiDisconnectedPairingErrorModal: false});
    this.setState({showWifiConnectedPairingErrorModal: false});
    this.setState({ipAddressFound: undefined}) // reset to scan again
  }

  render() {
    StatusBarIOS.setHidden('false');
    StatusBarIOS.setStyle('light-content');
    console.log(this.state);

    if(this.state.cameraPermissions!==true && this.state.appState!=='background') {
      // mimics an event listener for permissions: if the permissions are not set to true, keep checking to see if it changes
      this._checkCameraPermissions(); 
    }
    
    if (!this.state.cameraOn) {
      // turn the camera off when we go to the JoyPad
      return (
        <View style={styles.container}/>
      );
    } else if (this.state.cameraOn) {

      if(this.state.cameraPermissions !== false) {
        // normal state of the app when on the pairing screen; shows a QR scanner with appropriate overlays/buttons/instructions
        return (
          <View >
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.camera}
              torchMode={this.state.cameraTorchToggle}
              aspect={Camera.constants.Aspect.Fill}
              onBarCodeRead={_.throttle(this._onBarCodeRead.bind(this), 1000, {'leading': true, 'trailing': false})}
              defaultOnFocusComponent={true}
              orientation={Camera.constants.Orientation.portrait}
              onFocusChanged={ this.state.handleFocusChanged }>

              <DarkOverlays>

                <SegmentedControl selectedIndex={this.state.selectedIndex} _onChange={this._onChange.bind(this)}/>
                {this.state.selectedIndex===0 ? <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/> : <PairingInstructions/>}
                {this.state.selectedIndex===0 ? <FocusBrackets/> : null}
                <FlashButtonArea cameraTorchToggle={this.state.cameraTorchToggle} _torchEnabled={this._torchEnabled.bind(this)}/>

                <DisconnectedModal fadeAnim={this.state.fadeAnim} showDisconnectedModal={this.state.showDisconnectedModal}/>
                
                <WifiConnectedPairingErrorModal showWifiConnectedPairingErrorModal={this.state.showWifiConnectedPairingErrorModal} _openWifiPermissions={this._openWifiPermissions.bind(this)} _closePairingErrorModal={this._closePairingErrorModal.bind(this)}/>
                <WifiDisconnectedPairingErrorModal showWifiDisconnectedPairingErrorModal={this.state.showWifiDisconnectedPairingErrorModal} _openWifiPermissions={this._openWifiPermissions.bind(this)} _closePairingErrorModal={this._closePairingErrorModal.bind(this)}/>

              </DarkOverlays>
            </Camera>
          </View>
        )
      } else if (this.state.cameraPermissions === false) {
        // when the camera permissions are off, disable the camera and show a modal that requests permissions with a link to settings
        return (
          <View style={styles.container}>
            <DarkOverlays>

              <SegmentedControl selectedIndex={this.state.selectedIndex} _onChange={this._onChange.bind(this)}/>
              <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/>
              <FocusBrackets/>
              <FlashButtonArea cameraTorchToggle={this.state.cameraTorchToggle} _torchEnabled={this._torchEnabled.bind(this)} />

              <CameraPermissionsModal _openCameraPermissions={this._openCameraPermissions.bind(this)} showCameraPermissionsModal={this.state.showCameraPermissionsModal}/>

            </DarkOverlays>
          </View>
        );
      } // end inside if-else block

    } // end outside if-else block
    
  } // end render
 
} // end constructor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  camera: {
    height: windowHeight,
    width: windowWidth,
  },
  rectanglePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

module.exports = QRReader;

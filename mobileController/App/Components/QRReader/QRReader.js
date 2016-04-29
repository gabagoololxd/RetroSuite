const React = require('react-native');
const Camera = require('react-native-camera').default;
const _ = require('lodash');
const Orientation = require('react-native-orientation');
const IconIon = require('react-native-vector-icons/Ionicons');
const Permissions = require('react-native-permissions');

const webSocket = require('../../Utils/webSocketMethods');
const JoyPadContainer = require('../JoyPad/JoyPadContainer');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Navigator,
  StatusBarIOS,
  SegmentedControlIOS,
  Linking,
  ScrollView,
  NetInfo,
  TouchableHighlight,
  Modal
} = React;

// On the iPhone 6+, if the app is launched in landscape, Dimensions.get('window').width returns the height and vice versa for width so we fix that here
var windowWidth, windowHeight;
if (Dimensions.get('window').width===736) {
  windowWidth = 414;
  windowHeight = 736
} else {
  windowWidth = Dimensions.get('window').width;
  windowHeight = Dimensions.get('window').height;
}

class QRReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermissions: false,
      showCameraPermissionsModal: false,
      cameraOn: true,
      cameraTorchToggle: Camera.constants.TorchMode.off,
      handleFocusChanged: () => {},
      selectedIndex: 0,

    }
  }

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait

    // Determine user permissions for the camera; if permission is authorized, use the camera/app; 
    // Otherwise, notify the user that they must allow camera access and provide a link to settings where they can do so
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
    
    // //for development purposes, simulates successful qr scan
    // const openJoyPadContainerCallback = () => {
    //   const navigator = this.props.navigator;
    //   const turnCameraOn = this.turnCameraOn.bind(this);
    //   const turnCameraOff = this.turnCameraOff.bind(this);
    //   turnCameraOff();
    //   //open up the JoyPadContainer
    //   navigator.push({
    //     component: JoyPadContainer,
    //     turnCameraOn: turnCameraOn.bind(this),
    //     sceneConfig: {
    //       ...Navigator.SceneConfigs.FloatFromBottom,
    //       gestures: {} //disable ability to swipe to pop back from JoyPadContainer to QRReader once past the ip address page
    //     }
    //   });
    // }
    // webSocket.PairController('10.0.0.215:1337', openJoyPadContainerCallback);
  }

  _onBarCodeRead(e) {
    const ipAddress = e.data;

    const success = () => {
      const navigator = this.props.navigator;
      const turnCameraOn = this.turnCameraOn.bind(this);
      const turnCameraOff = this.turnCameraOff.bind(this);
      turnCameraOff();

      //open up the JoyPadContainer
      navigator.push({
        component: JoyPadContainer,
        turnCameraOn: turnCameraOn.bind(this),
        sceneConfig: {
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {} //disable ability to swipe to pop back from JoyPadContainer to QRReader once past the ip address page
        }
      });
    }

    // TODO: 
    // Promise race, if after 2000 it doesnt pair successfully, check to see if connected to wifi, if not, then notify the user
    // What if when we scan, wifi is on, but the chrome app's wifi is off?
    NetInfo.fetch().done(
      (connectionInfo) => { console.log(connectionInfo, 'connectionInfo') }
    );
    
    webSocket.PairController(ipAddress, success);

    // TODO:
    // make instructions better with multiple click through steps and screenshots
    // when camera permissions are off, open up a modal that says we need the camera; yes link to settings to enable
    // when power button is pressed and app reopens, the connect is lost so it should open as the camera again
    // notify user when connection disconnects

    // autofocus camera
    // ABXY overlap / touch radius options
    // move components around?
    // how to tell if its the user's first time? open instructions then
  }

  _torchEnabled() {
    this.state.cameraTorchToggle === Camera.constants.TorchMode.on ? this.setState({ cameraTorchToggle: Camera.constants.TorchMode.off }) : this.setState({ cameraTorchToggle: Camera.constants.TorchMode.on });
  }

  turnCameraOff() { //we want to turn the camera off once the JoyPadContainer mounts because the camera is no longer necessary (until the user has to re-pair with the websockets server)
    this.setState({cameraOn:false})
  }
  turnCameraOn() {
    this.setState({cameraOn:true})
  }

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }
  

  render() {
    StatusBarIOS.setHidden('false');
    StatusBarIOS.setStyle('light-content');
    console.log(this.state);
    
    if (!this.state.cameraOn) {
      return (
        <View style={styles.container}>
          <View style={styles.overlayLeft}/> 
          <View style={styles.overlayTop}/> 
          <View style={styles.overlayRight}/> 
          <View style={styles.overlayBottom}/> 

          <SegmentedControlIOS 
            values={['Scan QR', 'Instructions']} 
            enabled={false}
            selectedIndex={0} 
            style={styles.segments} 
            tintColor="white"/>
         
          <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/>
          <View style={styles.rectangleContainer} pointerEvents='box-none'>
            <View style={styles.rectangleTopLeft} pointerEvents='box-none'></View>
            <View style={styles.rectangleTopRight} pointerEvents='box-none'></View>
            <View style={styles.rectangleBottomLeft} pointerEvents='box-none'></View>
            <View style={styles.rectangleBottomRight} pointerEvents='box-none'></View>
          </View>

          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={this._torchEnabled.bind(this)}  underlayColor={'#FC9396'}>
              <View style={styles.flashButton}>
                <IconIon name="ios-bolt-outline" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                <Text style={styles.flashButtonText} allowFontScaling={false}>Flash Off</Text>
              </View> 
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    } else if(this.state.cameraOn) {
      if(this.state.cameraPermissions !== false) {
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

              <View style={styles.overlayLeft}/> 
              <View style={styles.overlayTop}/> 
              <View style={styles.overlayRight}/> 
              <View style={styles.overlayBottom}/> 

              <SegmentedControlIOS 
                values={['Scan QR', 'Instructions']} 
                selectedIndex={this.state.selectedIndex} 
                style={styles.segments} 
                tintColor="white"
                onChange={this._onChange.bind(this)}
                />

              {this.state.selectedIndex===1 ? 
                <ScrollView style={styles.modal}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}} allowFontScaling={false}>Welcome to RetroSuite Controller!</Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontWeight: 'bold', fontSize: 15}} allowFontScaling={false}>1.<Text style={{fontWeight: 'normal', fontSize: 15}} allowFontScaling={false}> Download the <Text style={{color: 'blue', textDecorationLine: 'underline'}} allowFontScaling={false} onPress={() =>  Linking.openURL('https://chrome.google.com/webstore/detail/retrosuite-emu/bnjapfbdmfjehbgohiebcnmombalmbfd').catch(err => console.error('An error occurred', err))}>RetroSuite EMU Chrome App</Text> to your computer.</Text></Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontWeight: 'bold', fontSize: 15}} allowFontScaling={false}>2.<Text style={{fontWeight: 'normal', fontSize: 15}} allowFontScaling={false}> Make sure your computer and your phone are connected to the same Wi-Fi network. <Text style={{color: 'blue', textDecorationLine: 'underline'}} allowFontScaling={false} onPress={() =>  Linking.openURL('prefs:root=WIFI').catch(err => console.error('An error occurred', err))}>Click here</Text> to connect your iPhone to Wi-Fi.</Text></Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontWeight: 'bold', fontSize: 15}} allowFontScaling={false}>3.<Text style={{fontWeight: 'normal', fontSize: 15}} allowFontScaling={false}> On your computer, select a game. On the next "Choose Your Controller" screen, click "Mobile Phone".</Text></Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontWeight: 'bold', fontSize: 15}} allowFontScaling={false}>4.<Text style={{fontWeight: 'normal', fontSize: 15}} allowFontScaling={false}> On your phone, switch to "Scan QR" and point your camera at the QR code. Happy gaming; your phone is paired!</Text></Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontSize: 15}} allowFontScaling={false}></Text>
                  <Text style={{fontStyle: 'italic', fontSize: 15}} allowFontScaling={false}>*Remember: you can use your phone as a hotspot for your computer when Wi-Fi is spotty or nonexistant. <Text style={{color: 'blue', textDecorationLine: 'underline', fontStyle: 'normal'}} allowFontScaling={false} onPress={() =>  Linking.openURL('prefs:root=INTERNET_TETHERING').catch(err => console.error('An error occurred', err))}>Click here</Text> to turn on Personal Hotspot.</Text>
                </ScrollView> :
                <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/>
              }

              {this.state.selectedIndex===0 ? 
                <View style={styles.rectangleContainer} pointerEvents='box-none'>
                  <View style={styles.rectangleTopLeft} pointerEvents='box-none'></View>
                  <View style={styles.rectangleTopRight} pointerEvents='box-none'></View>
                  <View style={styles.rectangleBottomLeft} pointerEvents='box-none'></View>
                  <View style={styles.rectangleBottomRight} pointerEvents='box-none'></View>
                </View>
              :
                null
              }

              <View style={styles.bottomButtonContainer}>
                <TouchableWithoutFeedback onPress={this._torchEnabled.bind(this)}  underlayColor={'#FC9396'}>
                  {this.state.cameraTorchToggle === Camera.constants.TorchMode.off ? 
                    <View style={styles.flashButton}>
                      <IconIon name="ios-bolt-outline" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                      <Text style={styles.flashButtonText} allowFontScaling={false}>Flash Off</Text>
                    </View> 
                  : 
                    <View style={styles.flashButton}>
                      <IconIon name="ios-bolt" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                      <Text style={styles.flashButtonText} allowFontScaling={false}>Flash On</Text>
                    </View>
                  }
                </TouchableWithoutFeedback>
              </View>

            </Camera>
          </View>
        ) //return
      } else if(this.state.cameraPermissions === false) {
        return (
          <View style={styles.container}>
            <View style={styles.overlayLeft}/> 
            <View style={styles.overlayTop}/> 
            <View style={styles.overlayRight}/> 
            <View style={styles.overlayBottom}/> 

            <SegmentedControlIOS 
              values={['Scan QR', 'Instructions']} 
              enabled={false}
              selectedIndex={0} 
              style={styles.segments} 
              tintColor="white"/>

            <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/>
            <View style={styles.rectangleContainer} pointerEvents='box-none'>
              <View style={[styles.rectangleTopLeft, {borderColor: "rgba(237,237,237,0.5)"}]} pointerEvents='box-none'></View>
              <View style={[styles.rectangleTopRight, {borderColor: "rgba(237,237,237,0.5)"}]} pointerEvents='box-none'></View>
              <View style={[styles.rectangleBottomLeft, {borderColor: "rgba(237,237,237,0.5)"}]} pointerEvents='box-none'></View>
              <View style={[styles.rectangleBottomRight, {borderColor: "rgba(237,237,237,0.5)"}]} pointerEvents='box-none'></View>
            </View>

            <Modal animated={true}
                   transparent={true}
                   visible={this.state.showCameraPermissionsModal}>
              <View style={styles.cameraPermissionsAlert} pointerEvents='box-none'> 
                <Text style={styles.useYourCameraTitleText}>Use your camera?</Text>
                <View style={styles.line}/>
                <Text style={styles.useYourCameraDescriptionText}>Pairing your controller requires access to your camera.</Text>

                <TouchableHighlight style={styles.yesButton}
                                    onPress={null}
                                    underlayColor='#8d4e91'>
                  <Text style={styles.yesText}>Yes</Text>
                </TouchableHighlight>
              </View>
            </Modal>


            <View style={styles.bottomButtonContainer}>
              <TouchableWithoutFeedback onPress={this._torchEnabled.bind(this)}  underlayColor={'#FC9396'}>
                <View style={styles.flashButton}>
                  <IconIon name="ios-bolt-outline" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                  <Text style={styles.flashButtonText} allowFontScaling={false}>Flash Off</Text>
                </View> 
              </TouchableWithoutFeedback>
            </View>
          </View>
        );
      } //inside else block

    } //outside else block

  } //render
 
} //constructor

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  camera: {
    height: windowHeight,
    width: windowWidth,
  },
  segments: {
    marginTop: 25
  },
  rectanglePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangleContainer: {
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopLeft: {
    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    left: windowWidth - 311/375 * windowWidth - 7,
    top: windowHeight * 0.25 - 7 ,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopRight: {
    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    top: windowHeight * 0.25 - 7,
    right: windowWidth - 311/375 * windowWidth - 7,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomLeft: {
    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    left: windowWidth - 311/375 * windowWidth - 7,
    bottom: windowHeight - windowHeight * 0.25 - windowWidth * 2/3 - 7,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomRight: {
    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    right: windowWidth - 311/375 * windowWidth - 7,
    bottom: windowHeight - windowHeight * 0.25 - windowWidth * 2/3 - 7,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },

  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 15
  },
  flashButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  flashIcon: {
    flex: 1,
    width: 52.5,
    height: 55,
    backgroundColor: 'transparent'
  },
  flashButtonText: {
    flex: 1,
    fontFamily: 'docker',
    marginBottom: 10,
    marginLeft: -20,
    color: 'rgba(237,237,237,0.5)',
    fontSize: 20,
    fontWeight: 'bold',
  },

  overlayTop: {
    height: windowHeight * 0.25,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  overlayRight: {
    height: windowWidth * 2/3,
    width: windowWidth - 311/375 * windowWidth,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    right: 0,
    top: windowHeight * 0.25,
  },
  overlayLeft: {
    height: windowWidth * 2/3,
    width: windowWidth - 311/375 * windowWidth,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    top: windowHeight * 0.25
  },
  overlayBottom: {
    height: windowHeight - windowHeight * 0.25 - windowWidth * 2/3,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },

  modal: {
    flex: 1,
    marginTop: windowWidth * (20/414),
    marginBottom: windowWidth * (20/414),
    marginHorizontal: windowWidth * (20/414),
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: windowWidth * (20/414),
  },

  cameraPermissionsAlert: {
    flex: 1,
    marginTop: 0.32 * windowHeight,
    marginBottom: windowWidth===320 ? windowWidth * (325/414) : (windowWidth===414 ? windowWidth * (325/414) : windowWidth * 330/414),
    marginHorizontal: windowWidth===320 ? windowWidth * (62/414) : (windowWidth===414 ? windowWidth * (63/414) : windowWidth * 63/414),
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: windowWidth * (20/414),

    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  useYourCameraTitleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: windowWidth * (16/414)
  },
  line: {
    marginTop: windowWidth * (6/414),
    width: windowWidth * (140/414),
    height: 2,
    backgroundColor: '#d3d3d3'
  },
  useYourCameraDescriptionText: {
    marginTop: windowWidth * (3/414),
    textAlign: 'center',
    fontSize: windowWidth * (12/414),
    lineHeight: windowWidth * (20/414)
  },
  yesButton: {
    height: windowWidth * (40/414),
    width: 180,
    marginTop: 15,
    borderRadius: 3,
    backgroundColor: '#99559e',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  yesText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
});

module.exports = QRReader;

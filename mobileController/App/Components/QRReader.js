var React = require('react-native');
var Camera = require('react-native-camera').default;
var IconIon = require('react-native-vector-icons/Ionicons');
var utils = require('../Utils/utils');
var ControllerView = require('./ControllerView');
var _ = require('lodash');
var Orientation = require('react-native-orientation');
var BarcodeScanner = require('react-native-barcodescanner');
var StatusBarAndroid = require('react-native-android-statusbar');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Navigator,
  StatusBarIOS,
  SegmentedControlIOS,
  Platform,
  Linking,
  ScrollView,
} = React;

class QRReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraTorchToggle: Camera.constants.TorchMode.off,
      handleFocusChanged: () => {},
      androidTorch: "off",
      cameraOn: true,
      selectedIndex: 0,
    }
  }

  componentDidMount() {
    Orientation.lockToPortrait(); //this will lock the view to Portrait
    
    // //for development purposes, simulates successful qr scan
    // var openControllerViewCallback = () => {
    //   var navigator = this.props.navigator;
    //   var turnCameraOn = this.turnCameraOn.bind(this);
    //   var turnCameraOff = this.turnCameraOff.bind(this);
    //   turnCameraOff();
    //   //open up the ControllerView
    //   navigator.push({
    //     component: ControllerView,
    //     turnCameraOn: turnCameraOn.bind(this),
    //     sceneConfig: {
    //       ...Navigator.SceneConfigs.FloatFromBottom,
    //       gestures: {} //disable ability to swipe to pop back from ControllerView to QRReader once past the ip address page
    //     }
    //   });
    // }
    // utils.PairController('10.0.0.215:1337', openControllerViewCallback);
  }

  _onBarCodeRead(e) {
    //format of QR code: https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=10.6.30.50:1337
    var ipAddress = e.data;
    console.log("QR Code Found", ipAddress);

    var success = () => {
      var navigator = this.props.navigator;
      var turnCameraOn = this.turnCameraOn.bind(this);
      var turnCameraOff = this.turnCameraOff.bind(this);
      turnCameraOff();
      //open up the ControllerView
      navigator.push({
        component: ControllerView,
        turnCameraOn: turnCameraOn.bind(this),
        sceneConfig: {
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {} //disable ability to swipe to pop back from ControllerView to QRReader once past the ip address page
        }
      });
    }

    utils.PairController(ipAddress, success);
  }

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  }

  // For Android
  _toggleTorch() {
    console.log(this.state.androidTorch)
    if (this.state.androidTorch === 'on') {
      this.setState({androidTorch: 'off'})
    }
    else {
      this.setState({androidTorch: 'on'})
    }
  }
  // For IOS
  _torchEnabled() {
    this.state.cameraTorchToggle === Camera.constants.TorchMode.on ? this.setState({ cameraTorchToggle: Camera.constants.TorchMode.off }) : this.setState({ cameraTorchToggle: Camera.constants.TorchMode.on });
    // Linking.openURL('prefs:root=Wifi').catch(err => console.error('An error occurred', err));
  }

  turnCameraOff() {
    this.setState({cameraOn:false})
  }

  turnCameraOn() {
    this.setState({cameraOn:true})
  }

  render() {
    // check for IOS specific
    if (Platform.OS === 'ios') {
      StatusBarIOS.setHidden('false');
      StatusBarIOS.setStyle('light-content');
      if (this.state.cameraOn) {
        return (
          <View >
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
              style={styles.preview}
              torchMode={this.state.cameraTorchToggle}
              aspect={Camera.constants.Aspect.Fill}
              onBarCodeRead={_.once(this._onBarCodeRead.bind(this))}
              defaultOnFocusComponent={ true }
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
                  <Text style={{fontStyle: 'italic', fontSize: 15}} allowFontScaling={false}>*Remember: you can use your phone as a hotspot for your computer when Wi-Fi is spotty or nonexistant. <Text style={{color: 'blue', textDecorationLine: 'underline'}} allowFontScaling={false} onPress={() =>  Linking.openURL('prefs:root=INTERNET_TETHERING').catch(err => console.error('An error occurred', err))}>Click here</Text> to turn on Personal Hotspot.</Text>
                </ScrollView> :
                <View style={styles.rectanglePlaceholder} pointerEvents='box-none'/>
              }

              {this.state.selectedIndex===0 ? 
                <View style={styles.rectangleContainer} pointerEvents='box-none'>
                  <View style={styles.rectangleTopLeft} pointerEvents='box-none'></View>
                  <View style={styles.rectangleTopRight} pointerEvents='box-none'></View>
                  <View style={styles.rectangleBottomLeft} pointerEvents='box-none'></View>
                  <View style={styles.rectangleBottomRight} pointerEvents='box-none'></View>
                </View>:
                null
              }

              <View style={styles.bottomButtonContainer}>
                <TouchableWithoutFeedback onPress={this._torchEnabled.bind(this)}  underlayColor={'#FC9396'}>
                  {this.state.cameraTorchToggle === Camera.constants.TorchMode.off ? 
                    <View style={styles.flashButton}>
                      <IconIon name="ios-bolt-outline" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                      <Text style={styles.flashButtonText} allowFontScaling={false}>Flash Off</Text>
                    </View> : 
                    <View style={styles.flashButton}>
                      <IconIon name="ios-bolt" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
                      <Text style={styles.flashButtonText} allowFontScaling={false}>Flash On</Text>
                    </View>
                  }
                </TouchableWithoutFeedback>
              </View>

            </Camera>
          </View>

        );
      } else {
        return null;
      }
    } else { //TODO: android
      if (this.state.cameraOn) {
        return (
            <BarcodeScanner
              onBarCodeRead={_.once(this._onBarCodeRead.bind(this))}
              style={{ flex: 1 }}
              torchMode={this.state.androidTorch}
              >
            <View style={styles.bottomButtonContainerAndroid}>
                <TouchableOpacity onPress={this._toggleTorch.bind(this)} style={styles.flashButton} underlayColor={'#FC9396'}>
                  {this.state.androidTorch === 'off'? <IconIon name="ios-bolt-outline" size={55} color="rgba(237,237,237,0.5)" style={styles.flashIcon} /> : <IconIon name="ios-bolt" size={55} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />}
                </TouchableOpacity>
            </View>
          </BarcodeScanner>
        );
      } else {
        return null;
      }
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  segments : {
    marginTop: 25
  },

  rectanglePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangleContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    left: 0,
    top: 0,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopLeft: {
    height: 1/4 * Dimensions.get('window').width,
    width: 1/4 * Dimensions.get('window').width,
    position: 'absolute',
    left: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width - 7,
    top: Dimensions.get('window').height * 0.25 - 7 ,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopRight: {
    height: 1/4 * Dimensions.get('window').width,
    width: 1/4 * Dimensions.get('window').width,
    position: 'absolute',
    top: Dimensions.get('window').height * 0.25 - 7,
    right: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width - 7,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomLeft: {
    height: 1/4 * Dimensions.get('window').width,
    width: 1/4 * Dimensions.get('window').width,
    position: 'absolute',
    left: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width - 7,
    bottom: Dimensions.get('window').height - Dimensions.get('window').height * 0.25 - Dimensions.get('window').width * 2/3 - 7,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomRight: {
    height: 1/4 * Dimensions.get('window').width,
    width: 1/4 * Dimensions.get('window').width,
    position: 'absolute',
    right: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width - 7,
    bottom: Dimensions.get('window').height - Dimensions.get('window').height * 0.25 - Dimensions.get('window').width * 2/3 - 7,
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
  bottomButtonContainerAndroid: {
    flexDirection: 'row',
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
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  overlayTop: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  overlayRight: {
    height: Dimensions.get('window').width * 2/3,
    width: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    right: 0,
    top: Dimensions.get('window').height * 0.25,
  },
  overlayLeft: {
    height: Dimensions.get('window').width * 2/3,
    width: Dimensions.get('window').width - 311/375 * Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    top: Dimensions.get('window').height * 0.25
  },
  overlayBottom: {
    height: Dimensions.get('window').height - Dimensions.get('window').height * 0.25 - Dimensions.get('window').width * 2/3,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.65)',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },

  modal: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    padding: 20,
  }
});

module.exports = QRReader;

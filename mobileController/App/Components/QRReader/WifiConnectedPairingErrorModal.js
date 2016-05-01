const React = require('react-native');

const {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Text,
  TouchableHighlight
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


// This presentational component renders the modal that appears when the user does not give proper camera permissions
class WifiConnectedPairingErrorModal extends React.Component { 
  render() {
    return (
      <Modal animated={true}
             transparent={true}
             visible={this.props.showWifiConnectedPairingErrorModal}>
        <View style={styles.wifiConnectedPairingErrorModal} pointerEvents='box-none'> 
          <View style={styles.alert} pointerEvents='box-none'> 
            <Text style={styles.titleText}>QR was scanned but couldn't connect to the Chrome App</Text>
            <View style={styles.line}/>
            <Text style={styles.descriptionText}>Check to make sure your phone and computer are connected to the same Wi-Fi network.</Text>

            <TouchableHighlight style={styles.openWifiSettingsButton}
                                onPress={this.props._openWifiPermissions.bind(this)}
                                underlayColor='#8d4e91'>
              <Text style={styles.buttonText}>Open Wi-Fi Settings</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.rescanButton}
                                onPress={this.props._closePairingErrorModal.bind(this)}
                                underlayColor='#8d4e91'>
              <Text style={styles.buttonText}>Rescan</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

module.exports = WifiConnectedPairingErrorModal;

const styles = StyleSheet.create({
  wifiConnectedPairingErrorModal: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    width: windowWidth - windowWidth * (35/414) * 2,
    height: windowHeight - 0.32 * windowHeight - windowWidth * (210/414),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: windowWidth * (20/414),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: windowWidth * (20/414)
  },
  line: {
    marginTop: windowWidth * (10/414),
    width: windowWidth * (280/414),
    height: 2,
    backgroundColor: '#d3d3d3'
  },
  descriptionText: {
    marginTop: windowWidth * (10/414),
    textAlign: 'center',
    fontSize: windowWidth * (16/414),
    lineHeight: windowWidth * (20/414),
    fontWeight: '500'
  },
  openWifiSettingsButton: {
    height: windowWidth * (50/414),
    width: windowWidth * (255/375),
    marginTop: windowWidth * (15/375),
    borderRadius: windowWidth * (10/375),
    backgroundColor: '#99559e',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: windowWidth * (18/414),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  rescanButton: {
    height: windowWidth * (50/414),
    width: windowWidth * (255/375),
    marginTop: windowWidth * (5/375),
    borderRadius: windowWidth * (10/375),
    backgroundColor: '#99559e',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});
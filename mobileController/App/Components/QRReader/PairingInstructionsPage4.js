const React = require('react-native');
const IconIon = require('react-native-vector-icons/Ionicons');

const {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Linking,
  Image
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

class PairingInstructionsPage3 extends React.Component { 
  render() {
    return (
      <View style={styles.instructionsPage}>
        
        <View style={styles.iconContainer}>
          <IconIon name="qr-scanner" size={ windowWidth * (300/375)} allowFontScaling={false} color="rgba(132,99,135,.3)" style={styles.flashIcon} />
        </View>
          
        <View style={styles.text}>
          <Text style={styles.header}>{"4. Scan the QR"}</Text>
          <Text style={styles.header}>{""}</Text>
          <Text style={{fontWeight: 'normal', fontSize:  windowWidth * (14/375), fontWeight: '300', lineHeight:  windowWidth * (18/375), color: '#353632'}} 
                allowFontScaling={false}> 
                {"On your phone, switch to \"Scan QR\" and point your camera at the QR code. \n\nYou're ready. Happy gaming!"}
          </Text>
        </View>

      </View> 
    );
  }
}

module.exports = PairingInstructionsPage3;

const styles = StyleSheet.create({
  instructionsPage: {
    flex: 1,
    marginHorizontal: windowWidth * (15/414),
    borderRadius: windowWidth * (10/414),
    padding: windowWidth * (20/414),
  },
  iconContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    flex: 4,
    marginTop:  windowWidth * (10/414),
    marginHorizontal: windowWidth * (25/414),
  },
  header: {
    fontSize:  windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632'
  },
});
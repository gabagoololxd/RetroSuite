const React = require('react-native');
const IconIon = require('react-native-vector-icons/Ionicons');
const FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');


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
          <View style={styles.desktopIcon}>
            <IconIon name="ios-monitor-outline" size={ windowWidth * (200/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
          </View>
          
          <View style={styles.scanner}/>
          <View style={styles.whiteSpace}/>


          <View style={styles.iphoneIcon}>
            <IconIon name="iphone" size={ windowWidth * (150/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)"/>
          </View>
        </View>

        <View style={styles.qrCodeIcon}>
          <FontAwesomeIcon name="qrcode" size={ windowWidth * (50/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
        </View>
        <View style={styles.qrScannerIcon}>
          <IconIon name="qr-scanner" size={ windowWidth * (40/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
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

  desktopIcon: {
    marginTop: windowWidth * (50/375)
  },

  iphoneIcon: {
    marginTop: windowWidth===375 ? windowWidth * (-50/375) : (windowWidth===414 ? windowWidth * (-58/375) : windowWidth * (-58/375)),
    marginLeft: windowWidth * (-30/375),

  },

  qrCodeIcon: {
    position: 'absolute',
    top:  windowWidth===375 ? windowWidth * (50/375) : (windowWidth===414 ? windowWidth * (52/375) : windowWidth * (40/375)),
    left: windowWidth * (135/375)
  },

  qrScannerIcon: {
    position: 'absolute',
    top: windowWidth===320 ? windowWidth * (223/414) : windowWidth * (215/375),
    left: windowWidth * (124/375)
  },
  scanner: {
    position: 'absolute',
    top: windowWidth===320 ? windowWidth * (75/414) : windowWidth * (80/375),
    left: windowWidth * (44/375),

    width: 0,
    height: 0,
    borderRadius: windowWidth *0.25,
    borderTopWidth: windowWidth *0.25,
    borderTopColor: 'rgba(132,99,135,.6)',
    borderLeftColor: 'transparent',
    borderLeftWidth: windowWidth *0.25,
    borderRightColor: 'transparent',
    borderRightWidth: windowWidth *0.25,
    borderBottomColor: 'transparent',
    borderBottomWidth: windowWidth *0.25,
  },
  whiteSpace: {
    position: 'absolute',
    top: windowWidth===320 ? windowWidth * (169/414) : windowWidth * (167/375),
    left: windowWidth * (100/375),
    width: windowWidth * (60/375),
    height: windowWidth * (60/375),
    backgroundColor: 'white'
  },
  text: {
    flex: 4,
    marginTop:  windowWidth * (60/414),
    marginHorizontal: windowWidth * (25/414),
  },
  header: {
    fontSize:  windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632'
  },
});
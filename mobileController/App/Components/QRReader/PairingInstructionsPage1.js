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

class PairingInstructionsPage1 extends React.Component { 
  render() {
    return (
      <View style={styles.instructionsPage}>
        
        <View style={styles.iconContainer}>
          
          <View style={styles.chromeIcon}>
            <IconIon name="social-chrome-outline" size={windowWidth * (135/375)} allowFontScaling={false} color="rgba(132,99,135,.6)" style={styles.flashIcon} />
          </View>

          <View style={styles.downloadIcon}>
            <View style={styles.arrowIcon}>
              <IconIon name="arrow-down-c" size={windowWidth * (50/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
            </View>
            <View style={styles.minusIcon}>
              <IconIon name="minus" size={windowWidth * (50/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
            </View>
          </View>

          
          <View style={styles.desktopIcon}>
            <IconIon name="ios-monitor-outline" size={windowWidth * (200/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
          </View>

        </View>


          
        <View style={styles.text}>
          <Text style={styles.header} allowFontScaling={false} >{"1. Get the Chrome App"}</Text>
          <Text style={styles.header} allowFontScaling={false} >{""}</Text>
          <Text style={{fontWeight: 'normal', fontSize: windowWidth * (14/375), fontWeight: '300', lineHeight: windowWidth * (18/375), color: '#353632'}} 
                allowFontScaling={false}> 
                {"On your computer, download the "}
            <Text style={{color: '#99559e'}} 
                  allowFontScaling={false} 
                  onPress={() =>  Linking.openURL('https://chrome.google.com/webstore/detail/retrosuite-emu/bnjapfbdmfjehbgohiebcnmombalmbfd').catch(err => console.error('An error occurred', err))}> 
                  {"RetroSuite EMU Chrome App"}
            </Text> 
            {"."}
          </Text>
        </View>

      </View> 
    );
  }
}

module.exports = PairingInstructionsPage1;

const styles = StyleSheet.create({
  instructionsPage: {
    marginHorizontal: windowWidth * (15/414),
    borderRadius: windowWidth * (10/375),
    padding: windowWidth===320 ? windowWidth * (5/414) : windowWidth * (20/414),
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column'
  },
  iconContainer: {
    marginTop: windowWidth * (20/375),
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  chromeIcon: {
    marginTop: windowWidth * (-20/375)
  },
  downloadIcon: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: windowWidth * (-20/375),
  },
  minusIcon: {
    marginTop: windowWidth * (-34/375),
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      {scaleY: 0.8}
    ]
  },
  arrowIcon: {
    marginTop: windowWidth * (10/375),
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopIcon: {
    marginTop: windowWidth * (-50/375),
  },
  text: {
    flex: 1,
    marginHorizontal: windowWidth * (30/414),
    marginTop:  windowWidth * (-25/414),
  },
  header: {
    fontSize: windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632',
  },
});
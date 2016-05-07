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
            <IconIon name="social-chrome-outline" size={windowWidth * (150/375)} allowFontScaling={false} color="rgba(132,99,135,.3)" style={styles.flashIcon} />
          </View>

          <View style={styles.downloadIcon}>
            <View style={styles.arrowIcon}>
              <IconIon name="arrow-down-c" size={windowWidth * (75/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
            </View>
            <View style={styles.minusIcon}>
              <IconIon name="minus-round" size={windowWidth * (75/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
            </View>
          </View>

          
          <View style={styles.desktopIcon}>
            <IconIon name="ios-monitor-outline" size={windowWidth * (150/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
          </View>

        </View>


          
        <View style={styles.text}>
          <Text style={styles.header}>{"1. Get the Chrome App"}</Text>
          <Text style={styles.header}>{""}</Text>
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
    padding: windowWidth * (20/414),
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column'
  },
  iconContainer: {
    marginTop: windowWidth * (5/375),
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
    marginTop: windowWidth * (-50/375),
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    marginTop: windowWidth * (0/375),
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  desktopIcon: {
    marginTop: windowWidth * (-50/375),
  },
  text: {
    flex: 1,
    marginHorizontal: windowWidth * (35/414),
    marginTop:  windowWidth * (10/414),
  },
  header: {
    fontSize: windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632',
  },
});
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
          <IconIon name="social-chrome-outline" size={295} allowFontScaling={false} color="rgba(132,99,135,.3)" style={styles.flashIcon} />
        </View>
          
        <View style={styles.text}>
          <Text style={styles.header}>{"1. Get the Chrome App"}</Text>
          <Text style={styles.header}>{""}</Text>
          <Text style={{fontWeight: 'normal', fontSize: 14, fontWeight: '300', lineHeight: 18, color: '#353632'}} 
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
    flex: 1,
    marginHorizontal: windowWidth * (15/414),
    borderRadius: 10,
    padding: windowWidth * (20/414),
    // backgroundColor: 'blue'
  },
  iconContainer: {
    flex: 9,
    justifyContent: 'center', 
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  text: {
    flex: 3,
    marginHorizontal: windowWidth * (35/414),
    marginTop:  windowWidth * (10/414),


  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#353632'
  },
});
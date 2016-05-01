const React = require('react-native');

const {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text
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


// This presentational component renders the pairing instructions that appear when SegmentedControl is on index 1
class PairingInstructions extends React.Component { 
  render() {
    return (
      <ScrollView style={styles.instructions}>
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
      </ScrollView> 
    );
  }
}

module.exports = PairingInstructions;

const styles = StyleSheet.create({
  instructions: {
    flex: 1,
    marginTop: windowWidth * (20/414),
    marginBottom: windowWidth * (20/414),
    marginHorizontal: windowWidth * (20/414),
    backgroundColor: '#ffffff',
    borderRadius:10,
    padding: windowWidth * (20/414),
  },
});
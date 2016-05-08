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

class PairingInstructionsPage2 extends React.Component { 
  render() {
    return (
      <View style={styles.instructionsPage}>
        
        <View style={styles.iconContainer}>
          <View style={styles.topIconContainer}>

            <View style={styles.desktopIcon}>
              <IconIon name="ios-monitor-outline" size={windowWidth * (200/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
            </View>
            <View style={styles.iphoneIcon}>
              <IconIon name="iphone" size={windowWidth * (150/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
            </View>
          </View>
        </View>

        <View style={styles.wifiIconDesktop}>
          <IconIon name="wifi" size={windowWidth * (110/375)} allowFontScaling={false} color="rgba(132,99,135,.6)" style={styles.flashIcon} />
        </View>
        <View style={styles.wifiIconiPhone}>
          <IconIon name="wifi" size={windowWidth * (40/375)} allowFontScaling={false} color="rgba(132,99,135,.6)" style={styles.flashIcon} />
        </View>


        
          
        <View style={styles.text}>
          <Text style={styles.header}>{"2. Connect to Wi-Fi"}</Text>
          <Text style={styles.header}>{""}</Text>
          <Text 
            style={{fontWeight: 'normal', fontSize: windowWidth * (14/375), fontWeight: '300', lineHeight: windowWidth * (18/375), color: '#353632'}} 
            allowFontScaling={false}> 
            {"Make sure your computer and iPhone are connected to the same Wi-Fi network."}

            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>


            <Text 
              style={{color: '#99559e'}} 
              allowFontScaling={false} 
              onPress={() =>  Linking.openURL('prefs:root=WIFI').catch(err => console.error('An error occurred', err))}>
              {"Click here"}
            </Text>  
            {" to connect to Wi-Fi."}

            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>


            <Text allowFontScaling={false} style={{fontStyle: 'italic'}} >
              {'*Remember: you can'} 
              <Text 
                style={{color: '#99559e', fontStyle: 'normal'}} 
                allowFontScaling={false} 
                onPress={() =>  Linking.openURL('prefs:root=INTERNET_TETHERING').catch(err => console.error('An error occurred', err))}>
                {' use your phone as a hotspot '}
              </Text> 
              {'when Wi-Fi is spotty or nonexistant.'}
            </Text>


          </Text>
        </View>

      </View> 
    );
  }
}

module.exports = PairingInstructionsPage2;

console.log(windowWidth)

const styles = StyleSheet.create({
  instructionsPage: {
    flex: 1,
    marginHorizontal: windowWidth * (15/414),
    borderRadius: windowWidth * (10/375),
    padding: windowWidth * (20/414),
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  desktopIcon: {
    marginLeft: windowWidth * (300/375),
    marginRight: windowWidth * (10/375)
  },
  iphoneIcon: {
    marginLeft: windowWidth * (10/375),
    marginRight: windowWidth * (300/375)
  },
  wifiIconDesktop: {
    position: 'absolute',
    top: windowWidth===375 ? windowWidth * (55/375) : (windowWidth===414 ? windowWidth * (60/375) : windowWidth * (50/375)),
    left: windowWidth * (70/375)
  },
  wifiIconiPhone: {
    position: 'absolute',
    top: windowWidth===320 ? windowWidth * (97/414) : windowWidth * (100/375),
    right: windowWidth * (35/375)
  },
  text: {
    flex: 1,
    marginHorizontal: windowWidth * (15/414),
  },
  header: {
    fontSize: windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632'
  },
});
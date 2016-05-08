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
        
          
        <View style={styles.desktopIcon}>
          <IconIon name="ios-monitor-outline" size={ windowWidth * (200/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
          <View style={styles.leftCircleIcon}>
            <IconIon name="ios-circle-outline" size={ windowWidth * (40/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
          </View>
          <View style={styles.rightCircleIcon}>
            <IconIon name="ios-circle-filled" size={ windowWidth * (40/375)} allowFontScaling={false} color="rgba(132,99,135,.6)" style={styles.flashIcon} />
          </View>

          <View style={styles.controllerCord}/>
          <View style={styles.controllerIcon}>
            <IconIon name="ios-game-controller-a-outline" size={ windowWidth * (75/375)} allowFontScaling={false} color="rgba(21,21,20,0.6)" style={styles.flashIcon} />
          </View>
        </View>

 





          
        <View style={styles.text}>
          <Text style={styles.header}>{"3. Choose a game"}</Text>
          <Text style={styles.header}>{""}</Text>
          <Text style={{fontWeight: 'normal', fontSize:  windowWidth * (14/375), fontWeight: '300', lineHeight:  windowWidth * (18/375), color: '#353632'}} 
                allowFontScaling={false}> 
                {'On your computer, select a game. \n\nNext, on the "Choose Your Controller" screen, click "Mobile Phone”.'}
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
    borderRadius: windowWidth * (10/375),
    padding: windowWidth * (20/414),
  },
  desktopIcon: {
    alignSelf: 'center'
  },
  leftCircleIcon: {
    position: 'absolute',
    left: windowWidth * (30/375),
    top: windowWidth * (65/375)
  },
  rightCircleIcon: {
    position: 'absolute',
    right: windowWidth * (30/375),
    top: windowWidth * (65/375)
  },
  controllerCord: {
    position: 'absolute',
    top: windowWidth * (44/375),
    left: windowWidth * (91/375),
    width: windowWidth * (3/375),
    height:  windowWidth * (58/375),
    backgroundColor: 'rgba(21,21,20,0.6)'
  },
  controllerIcon: {
    position: 'absolute',
    left: windowWidth * (60/375),
    top: windowWidth * (80/375)
  },
  text: {
    flex: 1,
    marginTop:  windowWidth * (10/414),
    marginHorizontal: windowWidth * (19/414),
  },
  header: {
    fontSize: windowWidth * (18/375),
    fontWeight: 'bold',
    color: '#353632'
  },
});
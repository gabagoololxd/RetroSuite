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
        
          
          <View style={styles.topButtonContainer}>
            <View style={styles.gamesListIcon}>
              <IconIon name="ios-list-outline" size={ windowWidth * (150/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
            </View>

            <View style={styles.arrowIcon}>
              <IconIon name="arrow-down-c" size={ windowWidth * (75/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
            </View>
          </View>

          <View style={styles.dragBox}/>


          <View style={styles.buttomButtonContainer}>

            <View style={styles.circleIcons}>
              <View style={styles.leftCircleIcon}>
                <IconIon name="ios-circle-outline" size={ windowWidth * (40/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
              </View>
              <View style={styles.rightCircleIcon}>
                <IconIon name="ios-circle-filled" size={ windowWidth * (40/375)} allowFontScaling={false} color="rgba(132,99,135,.4)" style={styles.flashIcon} />
              </View>
            </View>

            <View style={styles.controllerCord}/>
            <View style={styles.controllerIcon}>
              <IconIon name="ios-game-controller-a-outline" size={ windowWidth * (110/375)} allowFontScaling={false} color="rgba(21,21,20,.5)" style={styles.flashIcon} />
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
  topButtonContainer: {
    borderBottomColor: 'rgba(21,21,20,.5)',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    paddingBottom: windowWidth * (30/375),
  },
  gamesListIcon: {
    marginLeft: windowWidth * (20/375),
    marginRight: windowWidth * (10/375),
  },
  arrowIcon: {
    marginTop: windowWidth * (10/375),
    marginLeft: windowWidth * (10/375),
    marginRight: windowWidth * (45/375),
  },
  dragBox: {
    width: windowWidth * (90/375),
    height: windowWidth * (45/375),
    position: 'absolute',
    top: windowWidth * (103/375),
    right: windowWidth * (40/375),
    borderWidth: 4,
    borderColor: 'rgba(21,21,20,.5)',
    borderStyle: 'dashed'
  },
  buttomButtonContainer: {
    flex: 1,
  },
  circleIcons: {
    paddingTop: windowWidth * (30/375),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: windowWidth * (-40/375)
  },
  leftCircleIcon: {
    marginLeft: windowWidth * (50/375),
    marginRight: windowWidth * (50/375),
  },
  rightCircleIcon: {
    marginLeft: windowWidth * (50/375),
    marginRight: windowWidth * (50/375),
  },
  controllerCord: {
    position: 'absolute',
    top: windowWidth * (10/375),
    left: windowWidth * (135/375),
    width: windowWidth * (5/375),
    height:  windowWidth * (55/375),
    backgroundColor: 'rgba(21,21,20,.5)'
  },
  controllerIcon: {
    alignSelf: 'center',
    marginBottom: windowWidth * (-40/375)
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
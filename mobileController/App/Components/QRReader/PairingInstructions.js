const React = require('react-native');
const ScrollableTabView = require('react-native-scrollable-tab-view');

const PairingInstructionsNavBar = require('./PairingInstructionsNavBar')
const PairingInstructionsPage1 = require('./PairingInstructionsPage1')
const PairingInstructionsPage2 = require('./PairingInstructionsPage2')
const PairingInstructionsPage3 = require('./PairingInstructionsPage3')
const PairingInstructionsPage4 = require('./PairingInstructionsPage4')



const {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity
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
      <View style={styles.wrapper}>
        <ScrollableTabView style={styles.swiper}
                           renderTabBar={() => <PairingInstructionsNavBar/>}
                           tabBarPosition={'bottom'}>
          <PairingInstructionsPage1/>
          <PairingInstructionsPage2/>
          <PairingInstructionsPage3/>
          <PairingInstructionsPage4/>
        </ScrollableTabView>
      </View>
    );
  }
}

module.exports = PairingInstructions;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: windowWidth * (20/414),
    marginBottom: windowWidth * (20/414),
    marginHorizontal: windowWidth * (20/414),
    backgroundColor: '#ffffff',
    borderRadius: windowWidth * (10/414),
  },
  swiper: {
    flex: 1,
    marginTop: windowWidth * (10/414),
    backgroundColor: 'transparent',
  },

  thing1: {
    flex: 1, 
    backgroundColor: 'red', 
  },
  thing2: {
    flex: 1, 
    backgroundColor: 'green', 
  },
  thing3: {
    flex: 1, 
    backgroundColor: 'blue', 
  },
  thing4: {
    flex: 1, 
    backgroundColor: 'purple', 
  },

});
const React = require('react-native');
const IconIon = require('react-native-vector-icons/Ionicons');

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

class PairingInstructionsNavBar extends React.Component {   
  render() {
    return (
      <View style={styles.navBar}>

        {this.props.activeTab===0 ? 
          <TouchableOpacity style={styles.leftArrow}>
            <IconIon name="ios-arrow-left" size={25} allowFontScaling={false} color="transparent" style={styles.flashIcon} />
          </TouchableOpacity>
          : 
          <TouchableOpacity style={styles.leftArrow} onPress={() => this.props.goToPage(this.props.activeTab-1)}>
            <IconIon name="ios-arrow-left" size={25} allowFontScaling={false} color="#007aff" style={styles.flashIcon} />
          </TouchableOpacity>
        }

        <View style={styles.dots}>
          {this.props.activeTab===0 ? <View style={styles.activeDot}/> : <View style={styles.dot}/>}
          {this.props.activeTab===1 ? <View style={styles.activeDot}/> : <View style={styles.dot}/>}
          {this.props.activeTab===2 ? <View style={styles.activeDot}/> : <View style={styles.dot}/>}
          {this.props.activeTab===3 ? <View style={styles.activeDot}/> : <View style={styles.dot}/>}
        </View>

        {this.props.activeTab===3 ?
          <TouchableOpacity style={styles.rightArrow}>
            <IconIon name="ios-arrow-right" size={25} allowFontScaling={false} color="transparent" style={styles.flashIcon} />
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.rightArrow} onPress={() => this.props.goToPage(this.props.activeTab+1)}>
            <IconIon name="ios-arrow-right" size={25} allowFontScaling={false} color="#007aff" style={styles.flashIcon} />
          </TouchableOpacity>
        }

      </View>
    );
  }
}

module.exports = PairingInstructionsNavBar;

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row'
  },
  leftArrow: {
    marginLeft: windowWidth * (10/375),
  },
  rightArrow: {
    marginRight: windowWidth * (10/375),
  },
  dot: {
    backgroundColor:'rgba(0,0,0,.2)', 
    width: windowWidth * (8/375),
    height: windowWidth * (8/375),
    borderRadius: windowWidth * (4/375),
    marginLeft: windowWidth * (3/375),
    marginRight: windowWidth * (3/375),
    marginTop: windowWidth * (3/375),
    marginBottom: windowWidth * (3/375),
  },
  activeDot: {
    backgroundColor:'#007aff', 
    width: windowWidth * (8/375),
    height: windowWidth * (8/375),
    borderRadius: windowWidth * (4/375),
    marginLeft: windowWidth * (3/375),
    marginRight: windowWidth * (3/375),
    marginTop: windowWidth * (3/375),
    marginBottom: windowWidth * (3/375),
  },
  navBar: {
    backgroundColor: 'transparent',
    borderBottomLeftRadius: windowWidth * (10/414),
    borderBottomRightRadius: windowWidth * (10/414),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});
const React = require('react-native');
const FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');

const {
  StyleSheet,
  Dimensions,
  View,
} = React;  

// On the iPhone 6+, if the app is launched in landscape, Dimensions.get('window').width returns the height and vice versa for width so we fix that here
var windowWidth, windowHeight;
if (Dimensions.get('window').width===736) {
  windowWidth = 414;
  windowHeight = 736
} else {
  windowWidth = Dimensions.get('window').width;
  windowHeight = Dimensions.get('window').height;
}

// This presentational component renders the pause button
class PauseButton extends React.Component { 
  render() {
    return (
      <View onTouchStart={this.props._pause.bind(this)}>
        <FontAwesomeIcon style={styles.pauseButton} name="pause-circle" size={windowWidth* 0.106} allowFontScaling={false} color="#353632"/>
      </View>
    );
  }
}

module.exports = PauseButton;

const styles = StyleSheet.create({
  pauseButton: {
    position: 'absolute',
    bottom: windowWidth * 0.035,
    right: windowWidth * 0.02666,
  }
});
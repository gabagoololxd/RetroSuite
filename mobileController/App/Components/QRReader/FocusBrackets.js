const React = require('react-native');

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

// This presentational component renders the brackets in the center of the camera
class FocusBrackets extends React.Component { 
  render() {
    return (
      <View style={styles.rectangleContainer} pointerEvents='box-none'>
        <View style={styles.rectangleTopLeft} pointerEvents='box-none'></View>
        <View style={styles.rectangleTopRight} pointerEvents='box-none'></View>
        <View style={styles.rectangleBottomLeft} pointerEvents='box-none'></View>
        <View style={styles.rectangleBottomRight} pointerEvents='box-none'></View>
      </View>
    );
  }
}

module.exports = FocusBrackets;

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopLeft: {

    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    left: windowWidth - 311/375 * windowWidth - 7,
    top: windowHeight * 0.25 - 7 ,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleTopRight: {

    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    top: windowHeight * 0.25 - 7,
    right: windowWidth - 311/375 * windowWidth - 7,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomLeft: {

    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    left: windowWidth - 311/375 * windowWidth - 7,
    bottom: windowHeight - windowHeight * 0.25 - windowWidth * 2/3 - 7,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },
  rectangleBottomRight: {

    height: 1/4 * windowWidth,
    width: 1/4 * windowWidth,
    position: 'absolute',
    right: windowWidth - 311/375 * windowWidth - 7,
    bottom: windowHeight - windowHeight * 0.25 - windowWidth * 2/3 - 7,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#ededed',
    backgroundColor: 'transparent',
  },

});
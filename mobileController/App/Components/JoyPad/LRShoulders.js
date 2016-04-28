const React = require('react-native');

const {
  Dimensions,
  StyleSheet,
  Text,
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

// This presentational component renders the left and right shoulder buttons
class LRShoulders extends React.Component { 
  render() {
    return (
      <View style={{flex: 1}} >
        <View style={[styles.lShoulderView,
                      this.props.currentButtonPresses.lShoulder ? {transform: [{translate: [0, windowWidth* 0.015]}]} : null]}>
          <View style={styles.lShoulderTopView}/>
          <View style={styles.lShoulderBottomView}/>
        </View>

        <View style={[styles.rShoulderView,
                      this.props.currentButtonPresses.rShoulder ? {transform: [{translate: [0, windowWidth* 0.015]}]} : null]}>
          <View style={styles.rShoulderTopView}/>
          <View style={styles.rShoulderBottomView}/>
        </View>
        <Text allowFontScaling={false} style={[styles.lText,
                      this.props.currentButtonPresses.lShoulder ? {transform: [ {scaleX: 1.3}, {translate: [0, windowWidth* 0.015]} ]} : null]}>
          L
        </Text>
        <Text allowFontScaling={false} style={[styles.rText,
                      this.props.currentButtonPresses.rShoulder ? {transform: [ {scaleX: 1.3}, {translate: [0, windowWidth* 0.015]} ]} : null]}>
          R
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lShoulderView: {

  },
  lText: {
    position: 'absolute',
    top: windowWidth * 0.02,
    left: windowWidth * 0.38,
    backgroundColor: 'transparent',
    color: '#8c8182',
    fontSize: windowWidth * (22/375) ,
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 1.3},
    ]
  },
  lShoulderTopView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: windowWidth * .13,
    borderTopColor: '#8c8182',
    borderStyle: 'solid',
    borderTopLeftRadius: windowWidth * 1,
    top: windowWidth * .1,
    left: windowWidth * .16,
    width: windowWidth * 0.5,
    height: windowWidth * 0,
    transform: [
      {skewX: '-40deg'},
    ]
  },
  lShoulderBottomView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: windowWidth * .13,
    borderTopColor: '#a69f9a',
    borderStyle: 'solid',
    borderTopLeftRadius: windowWidth * 1,
    top: windowWidth * .11,
    left: windowWidth * .16,
    width: windowWidth * 0.5,
    height: windowWidth * 0,
    transform: [
      {skewX: '-40deg'},
    ]
  },
  rShoulderView: {

  },
  rText: {
    position: 'absolute',
    top: windowWidth * 0.02,
    right: windowWidth * 0.38,
    backgroundColor: 'transparent',
    color: '#8c8182',
    fontSize: windowWidth * (22/375),
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 1.3},
    ]
  },
  rShoulderTopView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: windowWidth * .13,
    borderTopColor: '#8c8182',
    borderStyle: 'solid',
    borderTopRightRadius: windowWidth * 1,
    top: windowWidth * .1,
    right: windowWidth * .16,
    width: windowWidth * 0.5,
    height: windowWidth * 0,
    transform: [
      {skewX: '40deg'},
    ]
  },
  rShoulderBottomView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopWidth: windowWidth * .13,
    borderTopColor: '#a69f9a',
    borderStyle: 'solid',
    borderTopRightRadius: windowWidth * 1,
    top: windowWidth * .11,
    right: windowWidth * .16,
    width: windowWidth * 0.5,
    height: windowWidth * 0,
    transform: [
      {skewX: '40deg'},
    ]
  }
});

module.exports = LRShoulders;

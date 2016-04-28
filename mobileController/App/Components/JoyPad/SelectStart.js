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

// This presentational component renders the select and start buttons
class SelectStart extends React.Component { 
  render() {
    return (
      <View style={{flex: 1}} >
        <View style={[styles.selectBottomView, 
                      this.props.currentButtonPresses.select ? {backgroundColor: '#353632'} : null]}/>
        <View style={[styles.startBottomView, 
                      this.props.currentButtonPresses.start ? {backgroundColor: '#353632'} : null]}/>

        <View style={[styles.selectTopView, 
                      this.props.currentButtonPresses.select ? {backgroundColor: 'transparent'} : null]}/>
        <View style={[styles.startTopView, 
                      this.props.currentButtonPresses.start ? {backgroundColor: 'transparent'} : null]}/>

        <Text allowFontScaling={false} style={[styles.selectText,
                      this.props.currentButtonPresses.select ? { transform: [  {scaleX: 0.6}, {skewX: '-25deg'}, {translate: [windowWidth* 0.002, windowWidth* 0.003]}] } : null]}>
          SELECT
        </Text>
        <Text allowFontScaling={false} style={[styles.startText,
                      this.props.currentButtonPresses.start ? { transform: [  {scaleX: 0.6}, {skewX: '-25deg'}, {translate: [windowWidth* 0.002, windowWidth* 0.003]}] } : null]}>
          START
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  selectBottomView: {
    position: 'absolute',
    bottom: windowWidth * (0.15 - 0.1),
    left: 0 + ( (windowWidth * 0.8 - 0) / 2 - ((windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15) ) * 5/6,
    height: windowWidth * 0.07,
    width: (windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15,
    backgroundColor: '#252622',
    borderTopLeftRadius: windowWidth* 0.288,
    borderTopRightRadius: windowWidth* 0.288,
    borderBottomLeftRadius: windowWidth* 0.253,
    borderBottomRightRadius: windowWidth* 0.253,
    transform: [
      {translate: [0, windowWidth* 0.003]}
    ]
  },
  startBottomView: {
    position: 'absolute',
    bottom: windowWidth * (0.15 - 0.1),
    left: windowWidth * (0.8/2) + ( windowWidth * (0.8/2)- ((windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15) ) * 1/6, 
    height: windowWidth * 0.07,
    width: (windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15,
    backgroundColor: '#252622',
    borderTopLeftRadius: windowWidth* 0.288,
    borderTopRightRadius: windowWidth* 0.288,
    borderBottomLeftRadius: windowWidth* 0.253,
    borderBottomRightRadius: windowWidth* 0.253,
    transform: [
      {translate: [0, windowWidth* 0.003]}
    ]
  },
  selectTopView: {
    position: 'absolute',
    bottom: windowWidth * (0.15 - 0.1),
    left: 0 + ( (windowWidth * 0.8 - 0) / 2 - ((windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15) ) * 5/6,
    height: windowWidth * 0.07,
    width: (windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15,
    backgroundColor: '#353632',
    borderTopLeftRadius: windowWidth* 0.288,
    borderTopRightRadius: windowWidth* 0.288,
    borderBottomLeftRadius: windowWidth* 0.253,
    borderBottomRightRadius: windowWidth* 0.253,
    transform: [
      {translate: [0, windowWidth* -0.007]}
    ]
  },
  startTopView: {
    position: 'absolute',
    bottom: windowWidth * (0.15 - 0.1),
    left: windowWidth * (0.8/2) + ( windowWidth * (0.8/2)- ((windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15) ) * 1/6, 
    height: windowWidth * 0.07,
    width: (windowWidth * 0.8 - 0) / 2 - windowWidth * 0.15,
    backgroundColor: '#353632',
    borderTopLeftRadius: windowWidth* 0.288,
    borderTopRightRadius: windowWidth* 0.288,
    borderBottomLeftRadius: windowWidth* 0.253,
    borderBottomRightRadius: windowWidth* 0.253,
    transform: [
      {translate: [0, windowWidth* -0.007]}
    ]
  },
  selectText: {
    position: 'absolute',
    bottom: windowWidth * 0.06,
    left: windowWidth * 0.135,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (15/375),
    letterSpacing: windowWidth * (5/375),
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},
      {translate: [0, windowWidth* -0.007]}
    ]
  },
  startText: {
    position: 'absolute',
    bottom: windowWidth * 0.06,
    left: windowWidth * 0.45,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (15/375),
    letterSpacing: windowWidth * (5/375),
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},
      {translate: [0, windowWidth* -0.007]}
    ]
  },
});

module.exports = SelectStart;

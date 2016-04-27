const React = require('react-native');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;  

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
                      this.props.currentButtonPresses.select ? { transform: [  {scaleX: 0.6}, {skewX: '-25deg'}, {translate: [Dimensions.get('window').width* 0.002, Dimensions.get('window').width* 0.005]}] } : null]}>
          SELECT
        </Text>
        <Text allowFontScaling={false} style={[styles.startText,
                      this.props.currentButtonPresses.start ? { transform: [  {scaleX: 0.6}, {skewX: '-25deg'}, {translate: [Dimensions.get('window').width* 0.002, Dimensions.get('window').width* 0.005]}] } : null]}>
          START
        </Text>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectBottomView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * (0.15 - 0.1),
    left: 0 + ( (Dimensions.get('window').width * 0.8 - 0) / 2 - ((Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15) ) * 5/6,
    height: Dimensions.get('window').width * 0.07,
    width: (Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15,
    backgroundColor: '#252622',
    borderTopLeftRadius: Dimensions.get('window').width* 0.288,
    borderTopRightRadius: Dimensions.get('window').width* 0.288,
    borderBottomLeftRadius: Dimensions.get('window').width* 0.253,
    borderBottomRightRadius: Dimensions.get('window').width* 0.253,
    transform: [
      {translate: [0, Dimensions.get('window').width* 0.005]}
    ]
  },
  startBottomView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * (0.15 - 0.1),
    left: Dimensions.get('window').width * (0.8/2) + ( Dimensions.get('window').width * (0.8/2)- ((Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15) ) * 1/6, 
    height: Dimensions.get('window').width * 0.07,
    width: (Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15,
    backgroundColor: '#252622',
    borderTopLeftRadius: Dimensions.get('window').width* 0.288,
    borderTopRightRadius: Dimensions.get('window').width* 0.288,
    borderBottomLeftRadius: Dimensions.get('window').width* 0.253,
    borderBottomRightRadius: Dimensions.get('window').width* 0.253,
    transform: [
      {translate: [0, Dimensions.get('window').width* 0.005]}
    ]
  },
  selectTopView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * (0.15 - 0.1),
    left: 0 + ( (Dimensions.get('window').width * 0.8 - 0) / 2 - ((Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15) ) * 5/6,
    height: Dimensions.get('window').width * 0.07,
    width: (Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15,
    backgroundColor: '#353632',
    borderTopLeftRadius: Dimensions.get('window').width* 0.288,
    borderTopRightRadius: Dimensions.get('window').width* 0.288,
    borderBottomLeftRadius: Dimensions.get('window').width* 0.253,
    borderBottomRightRadius: Dimensions.get('window').width* 0.253,
  },
  startTopView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * (0.15 - 0.1),
    left: Dimensions.get('window').width * (0.8/2) + ( Dimensions.get('window').width * (0.8/2)- ((Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15) ) * 1/6, 
    height: Dimensions.get('window').width * 0.07,
    width: (Dimensions.get('window').width * 0.8 - 0) / 2 - Dimensions.get('window').width * 0.15,
    backgroundColor: '#353632',
    borderTopLeftRadius: Dimensions.get('window').width* 0.288,
    borderTopRightRadius: Dimensions.get('window').width* 0.288,
    borderBottomLeftRadius: Dimensions.get('window').width* 0.253,
    borderBottomRightRadius: Dimensions.get('window').width* 0.253,
  },
  selectText: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.06,
    left: Dimensions.get('window').width * 0.135,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: Dimensions.get('window').width * (15/375),
    letterSpacing: Dimensions.get('window').width * (5/375),
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},
    ]
  },
  startText: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.06,
    left: Dimensions.get('window').width * 0.45,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: Dimensions.get('window').width * (15/375),
    letterSpacing: Dimensions.get('window').width * (5/375),
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},
    ]
  },
});

module.exports = SelectStart;

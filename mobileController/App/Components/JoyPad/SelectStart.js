var React = require('react-native');

var {
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
        <View style={[styles.selectView, 
                      this.props.currentButtonPresses.select ? {backgroundColor: '#252622'} : null]}/>
        <View style={[styles.startView, 
                      this.props.currentButtonPresses.start ? {backgroundColor: '#252622'} : null]}/>
        <Text style={[styles.selectText]}>SELECT</Text>
        <Text style={[styles.startText]}> START</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  selectView: {
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
  startView: {
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
    left: Dimensions.get('window').width * 0.13,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: 15,
    letterSpacing: 5,
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},

    ]
  },

  startText: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.06,
    left: Dimensions.get('window').width * 0.43,
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: 15,
    letterSpacing: 5,
    fontFamily: 'eurostile',
    transform: [
      {scaleX: 0.6},
      {skewX: '-25deg'},

    ]
  },
});

module.exports = SelectStart;

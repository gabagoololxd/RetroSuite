var React = require('react-native');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;  

// This presentational component renders the ABXY buttons
class ABXY extends React.Component { 
  render() {
    return (
      <View style={styles.ABXYCircleView}>
        <View style={styles.XYPillView}>
          <View style={[styles.XCircleView, 
                        this.props.currentButtonPresses.x ? {backgroundColor: 'rgba(108,95,122,1)'} : null]}/> 
          <View style={[styles.YCircleView, 
                        this.props.currentButtonPresses.y ? {backgroundColor: 'rgba(108,95,122,1)'} : null]}/> 
        </View> 
        <View style={styles.ABPillView}>
          <View style={[styles.ACircleView, 
                        this.props.currentButtonPresses.a ? {backgroundColor: 'rgba(45,12,82,1)'} : null]}/> 
          <View style={[styles.BCircleView, 
                        this.props.currentButtonPresses.b ? {backgroundColor: 'rgba(45,12,82,1)'} : null]}/> 
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  ABXYCircleView: {
    position: 'absolute',
    top: Dimensions.get('window').width * .15 + Dimensions.get('window').width * 0.425/8,
    right: Dimensions.get('window').width * 0.4/16, 
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    borderRadius: Dimensions.get('window').width * 0.75/2,
    backgroundColor: '#8c8182'
  },
  XYPillView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.05,
    left: Dimensions.get('window').width * 0.2, 
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.45,
    backgroundColor: '#a69f9a',
    borderTopLeftRadius: 108,
    borderTopRightRadius: 108,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    transform: [
      {rotate: '44.5deg'},
      {translate: [0, Dimensions.get('window').width* 0.01]}
    ]
  },
  ABPillView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.05,
    left: Dimensions.get('window').width * 0.2, 
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.45,
    backgroundColor: '#a69f9a',
    borderTopLeftRadius: 108,
    borderTopRightRadius: 108,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    transform: [
      {rotate: '45deg'},
      {translate: [Dimensions.get('window').width* 0.24, Dimensions.get('window').width* 0.01]}
    ]
  },

  ACircleView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.019,
    right: Dimensions.get('window').width * 0.021, 
    width: Dimensions.get('window').width * 0.155,
    height: Dimensions.get('window').width * 0.155,
    borderRadius: Dimensions.get('window').width * 0.155/2,
    backgroundColor: '#5b3980',
  },

  BCircleView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.019,
    right: Dimensions.get('window').width * 0.021, 
    width: Dimensions.get('window').width * 0.155,
    height: Dimensions.get('window').width * 0.155,
    borderRadius: Dimensions.get('window').width * 0.155/2,
    backgroundColor: '#5b3980',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * Dimensions.get('window').width * 0.18, Dimensions.get('window').width * 0.18]}
    ]
  },

  XCircleView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.019,
    right: Dimensions.get('window').width * 0.021, 
    width: Dimensions.get('window').width * 0.155,
    height: Dimensions.get('window').width * 0.155,
    borderRadius: Dimensions.get('window').width * 0.155/2,
    backgroundColor: '#998ca8',
  },

  YCircleView: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.019,
    right: Dimensions.get('window').width * 0.021, 
    width: Dimensions.get('window').width * 0.155,
    height: Dimensions.get('window').width * 0.155,
    borderRadius: Dimensions.get('window').width * 0.155/2,
    backgroundColor: '#998ca8',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * Dimensions.get('window').width * 0.18, Dimensions.get('window').width * 0.18]}
    ]
  },
});

module.exports = ABXY;

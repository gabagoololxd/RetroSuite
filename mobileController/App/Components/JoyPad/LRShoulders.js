const React = require('react-native');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = React;  

// This presentational component renders the left and right shoulder buttons
class LRShoulders extends React.Component { 
  render() {
    return (
      <View style={{flex: 1}} >
        <View style={[styles.lShoulderView,
                      this.props.currentButtonPresses.lShoulder ? {transform: [{translate: [0, Dimensions.get('window').width* 0.015]}]} : null]}>
          <View style={styles.lShoulderTopView}/>
          <View style={styles.lShoulderBottomView}/>
        </View>

        <View style={[styles.rShoulderView,
                      this.props.currentButtonPresses.rShoulder ? {transform: [{translate: [0, Dimensions.get('window').width* 0.015]}]} : null]}>
          <View style={styles.rShoulderTopView}/>
          <View style={styles.rShoulderBottomView}/>
        </View>
        <Text allowFontScaling={false} style={[styles.lText,
                      this.props.currentButtonPresses.lShoulder ? {transform: [ {scaleX: 1.3}, {translate: [0, Dimensions.get('window').width* 0.015]} ]} : null]}>
          L
        </Text>
        <Text allowFontScaling={false} style={[styles.rText,
                      this.props.currentButtonPresses.rShoulder ? {transform: [ {scaleX: 1.3}, {translate: [0, Dimensions.get('window').width* 0.015]} ]} : null]}>
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
    top: Dimensions.get('window').width * 0.02,
    left: Dimensions.get('window').width * 0.38,
    backgroundColor: 'transparent',
    color: '#8c8182',
    fontSize: Dimensions.get('window').width * (22/375) ,
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
    borderTopWidth: Dimensions.get('window').width * .13,
    borderTopColor: '#8c8182',
    borderStyle: 'solid',
    borderTopLeftRadius: Dimensions.get('window').width * 1,
    top: Dimensions.get('window').width * .1,
    left: Dimensions.get('window').width * .16,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0,
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
    borderTopWidth: Dimensions.get('window').width * .13,
    borderTopColor: '#a69f9a',
    borderStyle: 'solid',
    borderTopLeftRadius: Dimensions.get('window').width * 1,
    top: Dimensions.get('window').width * .11,
    left: Dimensions.get('window').width * .16,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0,
    transform: [
      {skewX: '-40deg'},
    ]
  },
  rShoulderView: {

  },
  rText: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.02,
    right: Dimensions.get('window').width * 0.38,
    backgroundColor: 'transparent',
    color: '#8c8182',
    fontSize: Dimensions.get('window').width * (22/375),
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
    borderTopWidth: Dimensions.get('window').width * .13,
    borderTopColor: '#8c8182',
    borderStyle: 'solid',
    borderTopRightRadius: Dimensions.get('window').width * 1,
    top: Dimensions.get('window').width * .1,
    right: Dimensions.get('window').width * .16,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0,
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
    borderTopWidth: Dimensions.get('window').width * .13,
    borderTopColor: '#a69f9a',
    borderStyle: 'solid',
    borderTopRightRadius: Dimensions.get('window').width * 1,
    top: Dimensions.get('window').width * .11,
    right: Dimensions.get('window').width * .16,
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0,
    transform: [
      {skewX: '40deg'},
    ]
  }
});

module.exports = LRShoulders;

const React = require('react-native');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
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


// This presentational component renders the ABXY buttons
class ABXY extends React.Component { 
  render() {
    return (
      <View style={styles.ABXYCircleView}>
        <View style={styles.XYPillView}>
          
         <View style={[styles.XBottomCircleView, 
                     this.props.currentButtonPresses.x ? {backgroundColor: '#998ca8'} : null]}/>
         <View style={[styles.XTopCircleView, 
                       this.props.currentButtonPresses.x ? {backgroundColor: 'transparent'} : null]}>
           <Text allowFontScaling={false} style={styles.XText}>X</Text>
         </View> 
         <View style={[styles.YBottomCircleView, 
                     this.props.currentButtonPresses.y ? {backgroundColor: '#998ca8'} : null]}/>
         <View style={[styles.YTopCircleView, 
                     this.props.currentButtonPresses.y ? {backgroundColor: 'transparent'} : null]}>
           <Text allowFontScaling={false} style={styles.YText}>Y</Text>
         </View>    

        </View> 
        <View style={styles.ABPillView}>
          <View style={[styles.ABottomCircleView, 
                      this.props.currentButtonPresses.a ? {backgroundColor: '#5b3980'} : null]}/>
          <View style={[styles.ATopCircleView, 
                        this.props.currentButtonPresses.a ? {backgroundColor: 'transparent'} : null]}>
            <Text allowFontScaling={false} style={styles.AText}>A</Text>
          </View> 
          <View style={[styles.BBottomCircleView, 
                      this.props.currentButtonPresses.b ? {backgroundColor: '#5b3980'} : null]}/>
          <View style={[styles.BTopCircleView, 
                      this.props.currentButtonPresses.b ? {backgroundColor: 'transparent'} : null]}>
            <Text allowFontScaling={false} style={styles.BText}>B</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ABXYCircleView: {
    position: 'absolute',
    top: windowWidth * .15 + windowWidth * 0.425/8,
    right: windowWidth * 0.4/16, 
    width: windowWidth * 0.75,
    height: windowWidth * 0.75,
    borderRadius: windowWidth * 0.75/2,
    backgroundColor: '#8c8182'
  },
  XYPillView: {
    position: 'absolute',
    top: windowWidth * 0.05,
    left: windowWidth * 0.2, 
    width: windowWidth * 0.2,
    height: windowWidth * 0.45,
    backgroundColor: '#a69f9a',
    borderTopLeftRadius: 108,
    borderTopRightRadius: 108,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    transform: [
      {rotate: '44.5deg'},
      {translate: [0, windowWidth* 0.01]}
    ]
  },
  ABPillView: {
    position: 'absolute',
    top: windowWidth * 0.05,
    left: windowWidth * 0.2, 
    width: windowWidth * 0.2,
    height: windowWidth * 0.45,
    backgroundColor: '#a69f9a',
    borderTopLeftRadius: 108,
    borderTopRightRadius: 108,
    borderBottomLeftRadius: 95,
    borderBottomRightRadius: 95,
    transform: [
      {rotate: '45deg'},
      {translate: [windowWidth* 0.24, windowWidth* 0.01]}
    ]
  },

  ATopCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#5b3980',
    transform: [
      {translate: [-windowWidth * 0.007 * 3/4, -windowWidth * 0.007 * 3/4]}
    ]
  },
  ABottomCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#2d1c40',
  },
  AText: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (22/375),
    fontFamily: 'eurostile',
    transform: [
      {rotate: '-45deg'},
      {scaleX: 1.3},
      {translate: [windowWidth * 0.075 * 1.2, -1 * windowWidth * 0.05 * 0.8]}
    ]
  },

  BTopCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#5b3980',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * windowWidth * 0.18, windowWidth * 0.173]}
    ]
  },

  BBottomCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#2d1c40',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * windowWidth * 0.18, windowWidth * 0.18]}
    ]
  },

  BText: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (22/375),
    fontFamily: 'eurostile',
    transform: [
      {rotate: '0deg'},
      {scaleX: 1.3},
      {translate: [-1 *windowWidth * 0.05 * 1 , windowWidth * 0.075 * 1 * 2]}
    ]
  },

  XTopCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#998ca8',
    transform: [
      {translate: [-windowWidth * 0.007 * 3/4, -1 * windowWidth * 0.007 * 3/4]}
    ]
  },

  XBottomCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#7a7086',
  },

  XText: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (22/375),
    fontFamily: 'eurostile',
    transform: [
      {rotate: '-45deg'},
      {scaleX: 1.3},
      {translate: [windowWidth * 0.075 * 1.2, -1 * windowWidth * 0.05 * 0.8]}
    ]
  },

  YTopCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#998ca8',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * windowWidth * 0.18, windowWidth * 0.173]}
    ]
  },

  YBottomCircleView: {
    position: 'absolute',
    top: windowWidth * 0.019,
    right: windowWidth * 0.021, 
    width: windowWidth * 0.155,
    height: windowWidth * 0.155,
    borderRadius: windowWidth * 0.155/2,
    backgroundColor: '#7a7086',
    transform: [
      {rotate: '-45deg'},
      {translate: [-1 * windowWidth * 0.18, windowWidth * 0.18]}
    ]
  },

  YText: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: '#a69f9a',
    fontSize: windowWidth * (22/375),
    fontFamily: 'eurostile',
    transform: [
      {rotate: '0deg'},
      {scaleX: 1.3},
      {translate: [-1 *windowWidth * 0.05 * 1 , windowWidth * 0.075 * 1 * 2]}
    ]
  },
});

module.exports = ABXY;

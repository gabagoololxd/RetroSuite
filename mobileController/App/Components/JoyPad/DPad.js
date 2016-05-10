const React = require('react-native');

const {
  Dimensions,
  StyleSheet,
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


// This presentational component renders the DPad
class DPad extends React.Component { 
  render() {
    return (
      <View style={styles.DPadView}>
        <View style={styles.DPadOuterCircle}>
          <View style={styles.DPadInnerCircle}>
            <View style={styles.leftRightView}>
              <View style={styles.DPadCenterCircleView}/>
              <View style={[styles.leftArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: windowWidth * (0.42 / 3) + windowWidth * (7.4/414) } : null,
                            this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null]}>
                <View style={[this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? styles.leftArrowFillerPressed: null,
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? styles.leftArrowFillerUpwards : null]}/>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {left: -windowWidth * 0.42  * 1/8, height: windowWidth * (+ 0.42 / 3)  ,  width: windowWidth * 0.1 * 1.1 , borderBottomLeftRadius: windowWidth * .02,  borderBottomRightRadius: windowWidth * .02, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? { height: windowWidth * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? {top: -1 * windowWidth * (8/375) , right: 0,    height: windowWidth * (0.42 / 3.5 + 0.02), width: windowWidth * 0.42 / 3} : null,
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' && windowWidth===320 ? {right: windowWidth * 0.42 / 3 * 1/8 + windowWidth * (-0.5/375), height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' && windowWidth!==320 ? {right: windowWidth * 0.42 / 3 * 1/8 , height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down'  && windowWidth===320 ? {right: windowWidth * 0.42 / 3 * 1/8 -  windowWidth * (1/414) + windowWidth * (-0.5/375), height: windowWidth * (+ 0.42 / 3)  ,  width: windowWidth * 0.42 / 3.9, borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down'  && windowWidth!==320 ? {right: windowWidth * 0.42 / 3 * 1/8 -  windowWidth * (1/414) , height: windowWidth * (+ 0.42 / 3)  ,  width: windowWidth * 0.42 / 3.9, borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
              <View style={[styles.rightArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622'} : null,
                            this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' && windowWidth===320 ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: windowWidth * (0.42 / 3) + windowWidth * (7/414)} : null,
                            this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' && windowWidth!==320 ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: windowWidth * (0.42 / 3) + windowWidth * (7.4/414)} : null,
                            this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? styles.rightArrowFillerPressed: null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? styles.rightArrowFillerUpwards : null]}/>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {height: windowWidth * (+ 0.42 / 3)  ,  width: windowWidth * 0.1 * 1.1 , borderBottomLeftRadius: windowWidth * .02,  borderBottomRightRadius: windowWidth * .02, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? { height: windowWidth * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {top: -1 * windowWidth * (8/375) , right: 0, height: windowWidth * (0.42 / 3.5 + 0.02), width: windowWidth * 0.42 / 3} : null,
                              
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' && windowWidth==320 ? {right: windowWidth * 0.42 / 3 * 1/8 + windowWidth * (-0.1/375), height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' && windowWidth!==320 ? {right: windowWidth * 0.42 / 3 * 1/8, height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' && (windowWidth===375 ||320 ) ? {height: windowWidth * (+ 0.42 / 3)  , width: windowWidth * 0.42 / 3.9, borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' && (windowWidth === 414 )  ? {height: windowWidth * (+ 0.42 / 3)  , width: windowWidth * 0.42 / 3.92, borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
            </View>

            <View style={styles.upDownView}>
              <View style={[styles.upArrowView, 
                            this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'}  : null,
                            this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: windowWidth * (0.42 / 3) + windowWidth * (7.4/414)} : null,
                            this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[(this.props.latestDPadTouch !== 'up'  && this.props.latestDPadTouch !== 'left' && this.props.latestDPadTouch !== 'right') || ( !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up) ? styles.upArrowFiller : null, //changed
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {backgroundColor: '#5d5e5a'}: null,
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? styles.upArrowFillerPressed : null]}/>
                <View style={[styles.arrowInsideView, 
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? { height: windowWidth * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {top: -1 * windowWidth * (8/375) , right: 0, height: windowWidth * (0.42 / 3.5 + 0.02), width: windowWidth * 0.42 / 3} : null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' && windowWidth==320 ? {right: windowWidth * 0.42 / 3 * 1/8  + windowWidth * (-0.5/375), height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' && windowWidth!==320 ? {right: windowWidth * 0.42 / 3 * 1/8 , height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? {height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>

              <View style={[styles.downArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: windowWidth * (0.42 / 3) + windowWidth * (7.4/414) - 1.3} : null]}>

                <View style={[!this.props.currentButtonPresses.up  && !this.props.currentButtonPresses.left  && !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.right ? styles.downArrowFiller : null, //changed
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? styles.downArrowFillerUpwards: null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? styles.downArrowFillerPressed : null]}/>

                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {top: -1 * windowWidth * (10/375) , right: 0, height: windowWidth * (0.42 / 2.75), width: windowWidth * 0.42 / 3} : null,
                              this.props.currentButtonPresses.down && this.props.latestDPadTouch==='down' ? { right: windowWidth * 0.42 / 5 * 1/8, top: +0, height: windowWidth * (0.42 / 2.9), width: windowWidth * 0.42 / 3.5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.up && this.props.latestDPadTouch==='up' ? {top: -1 * windowWidth * (8/375) , right: 0, height: windowWidth * (0.42 / 3.5 + 0.02), width: windowWidth * 0.42 / 3} : null,
                              this.props.currentButtonPresses.left && this.props.latestDPadTouch==='left' ? {height: windowWidth * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' && windowWidth===320 ? {right: windowWidth * 0.42 / 3 * 1/8 + windowWidth * (-0.5/375), height: windowWidth * (0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null,
                              
                              this.props.currentButtonPresses.right && this.props.latestDPadTouch==='right' && windowWidth!== 320 ? {right: windowWidth * 0.42 / 3 * 1/8, height: windowWidth * (0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: windowWidth * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
            </View>
          </View> 
        </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  DPadView: {
    position: 'absolute',
    top: windowWidth * .15 +  windowWidth * (0.33*2 - 0.56) / 2 ,
    left: windowWidth * (0.42*2 - 0.6) /2 , 
  },
  DPadOuterCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth * 0.56,
    height: windowWidth * 0.56,
    borderRadius: windowWidth * 0.56/2,
    backgroundColor: '#8c8182',
  },
  DPadInnerCircle: {
    position: 'absolute',
    top: windowWidth * (0.56 - 0.53)/2,
    left: windowWidth * (0.56 - 0.53)/2,
    width: windowWidth * 0.53,
    height: windowWidth * 0.53,
    borderRadius: windowWidth * 0.53/2,
    backgroundColor: '#a69f9a',
  },
  leftRightView: {
    position: 'absolute',
    top: windowWidth * (0.53 - 0.42)/2,
    left: windowWidth * (0.53 - (0.42/3))/2, 
    backgroundColor: 'transparent',
    height: windowWidth * 0.42,
    width: windowWidth * 0.42 / 3,
    borderRadius: windowWidth * .02,
    transform: [
      {rotate: '90deg'},
    ]
  },
  rightArrowView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: windowWidth * (0.42 / 3) ,
    width: 0,
    borderLeftWidth: windowWidth * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: windowWidth * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  rightArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: windowWidth * (0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  rightArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: windowWidth * (0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  arrowInsideView: {
    position: 'absolute',
    top: 0,
    right: windowWidth * 0.42 / 3 * 1/8,
    backgroundColor: '#353632', //353632
    height: windowWidth * 0.42 / 3.4 ,
    width: windowWidth * 0.42 / 3 * 6/8,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },
  leftArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: windowWidth * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: windowWidth * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: windowWidth * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },
  leftArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: windowWidth * (0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderTopLeftRadius: windowWidth * .02,
    borderTopRightRadius: windowWidth * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  leftArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: windowWidth * (0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderTopLeftRadius: windowWidth * .02,
    borderTopRightRadius: windowWidth * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },
  upDownView: {
    position: 'absolute',
    top: windowWidth * (0.53 - 0.42)/2,
    left: windowWidth * (0.53 - (0.42/3))/2, 
    backgroundColor: 'transparent',
    height: windowWidth * 0.42,
    width: windowWidth * 0.42 / 3,
    borderRadius: windowWidth * .02,
  },
  upArrowView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: windowWidth * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: windowWidth * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: windowWidth * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  upArrowFiller: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#353632',
    height: windowWidth * ( + 0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  upArrowFillerPressed: {
    position: 'absolute',
    top: windowWidth * (7/414),
    right: 0,
    backgroundColor: '#252622',
    height: windowWidth * ( + 0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  downArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: windowWidth * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: windowWidth * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: windowWidth * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  downArrowFiller: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: windowWidth * ( + 0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  downArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: windowWidth * ( + 0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  downArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: windowWidth * ( + 0.42 / 3) ,
    width: windowWidth * 0.42 / 3,
    borderBottomLeftRadius: windowWidth * .02,
    borderBottomRightRadius: windowWidth * .02,
  },

  DPadCenterCircleView: {
    position: 'absolute',
    bottom: windowWidth * 0.42 / 3 ,
    right: 0,
    backgroundColor: '#353632',
    height: windowWidth * 0.42 / 3,
    width: windowWidth * 0.42 / 3,
  }
});

module.exports = DPad;

const React = require('react-native');
const _ = require('lodash');

const {
  Dimensions,
  StyleSheet,
  View,
} = React;  

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
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.42 / 3) + Dimensions.get('window').width * (7.4/414) } : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null]}>
                <View style={[this.props.currentButtonPresses.left ? styles.leftArrowFillerPressed: null,
                              this.props.currentButtonPresses.right ? styles.leftArrowFillerUpwards : null]}/>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {left: -Dimensions.get('window').width * 0.42  * 1/8, height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  width: Dimensions.get('window').width * 0.1 * 1.1 , borderBottomLeftRadius: Dimensions.get('window').width * .02,  borderBottomRightRadius: Dimensions.get('window').width * .02, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.left ? { height: Dimensions.get('window').width * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.right ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0,    height: Dimensions.get('window').width * (0.42 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.42 / 3} : null,
                              
                              this.props.currentButtonPresses.up && Dimensions.get('window').width===320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 + Dimensions.get('window').width * (-0.5/375), height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.up && Dimensions.get('window').width!==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 , height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down  && Dimensions.get('window').width===320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 + Dimensions.get('window').width * (-0.5/375), height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down  && Dimensions.get('window').width!==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8, height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
              <View style={[styles.rightArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622'} : null,
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right && Dimensions.get('window').width===320 ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.42 / 3) + Dimensions.get('window').width * (7/414)} : null,
                            this.props.currentButtonPresses.right && Dimensions.get('window').width!==320 ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.42 / 3) + Dimensions.get('window').width * (7.4/414)} : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[this.props.currentButtonPresses.right ? styles.rightArrowFillerPressed: null,
                              this.props.currentButtonPresses.left ? styles.rightArrowFillerUpwards : null]}/>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  width: Dimensions.get('window').width * 0.1 * 1.1 , borderBottomLeftRadius: Dimensions.get('window').width * .02,  borderBottomRightRadius: Dimensions.get('window').width * .02, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.right ? { height: Dimensions.get('window').width * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.left ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.42 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.42 / 3} : null,
                              
                              this.props.currentButtonPresses.up && Dimensions.get('window').width==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 + Dimensions.get('window').width * (-0.1/375), height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.up && Dimensions.get('window').width!==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8, height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down  ? {height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
            </View>

            <View style={styles.upDownView}>
              <View style={[styles.upArrowView, 
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'}  : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.42 / 3) + Dimensions.get('window').width * (7.4/414)} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[!this.props.currentButtonPresses.up  && !this.props.currentButtonPresses.left  && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.right ? styles.upArrowFiller : null,
                              this.props.currentButtonPresses.down ? {backgroundColor: '#5d5e5a'}: null,
                              this.props.currentButtonPresses.up ? styles.upArrowFillerPressed : null]}/>
                <View style={[styles.arrowInsideView, 
                              this.props.currentButtonPresses.up ? { height: Dimensions.get('window').width * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.down ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.42 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.42 / 3} : null,
                              this.props.currentButtonPresses.left && Dimensions.get('window').width==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8  + Dimensions.get('window').width * (-0.5/375), height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.left && Dimensions.get('window').width!==320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 , height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right ? {height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>

              <View style={[styles.downArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.42 / 3) + Dimensions.get('window').width * (7.4/414)} : null]}>

                <View style={[!this.props.currentButtonPresses.up  && !this.props.currentButtonPresses.left  && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.right ? styles.downArrowFiller : null,
                              this.props.currentButtonPresses.up ? styles.downArrowFillerUpwards: null,
                              this.props.currentButtonPresses.down ? styles.downArrowFillerPressed : null]}/>

                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {top: -1 * Dimensions.get('window').width * (10/375) , right: 0, height: Dimensions.get('window').width * (0.42 / 2.6), width: Dimensions.get('window').width * 0.42 / 3} : null,
                              this.props.currentButtonPresses.down ? { height: Dimensions.get('window').width * (0.42 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.up ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.42 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.42 / 3} : null,
                              this.props.currentButtonPresses.left ? {height: Dimensions.get('window').width * (+ 0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right && Dimensions.get('window').width===320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8 + Dimensions.get('window').width * (-0.5/375), height: Dimensions.get('window').width * (0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              
                              this.props.currentButtonPresses.right && Dimensions.get('window').width!== 320 ? {right: Dimensions.get('window').width * 0.42 / 3 * 1/8, height: Dimensions.get('window').width * (0.42 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
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
    top: Dimensions.get('window').width * .15 +  Dimensions.get('window').width * (0.33*2 - 0.56) / 2 ,
    left: Dimensions.get('window').width * (0.42*2 - 0.56) /2 , 
  },
  DPadOuterCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width * 0.56,
    height: Dimensions.get('window').width * 0.56,
    borderRadius: Dimensions.get('window').width * 0.56/2,
    backgroundColor: '#8c8182',
  },
  DPadInnerCircle: {
    position: 'absolute',
    top: Dimensions.get('window').width * (0.56 - 0.53)/2,
    left: Dimensions.get('window').width * (0.56 - 0.53)/2,
    width: Dimensions.get('window').width * 0.53,
    height: Dimensions.get('window').width * 0.53,
    borderRadius: Dimensions.get('window').width * 0.53/2,
    backgroundColor: '#a69f9a',
  },
  leftRightView: {
    position: 'absolute',
    top: Dimensions.get('window').width * (0.53 - 0.42)/2,
    left: Dimensions.get('window').width * (0.53 - (0.42/3))/2, 
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * 0.42,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '90deg'},
    ]
  },
  rightArrowView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * (0.42 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  rightArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: Dimensions.get('window').width * (0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  rightArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: Dimensions.get('window').width * (0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  //Dimensions.get('window').width * 0.42 / 6 -  Dimensions.get('window').width * 0.42 / 3 * 6/8
  arrowInsideView: {
    position: 'absolute',
    top: 0,
    right: Dimensions.get('window').width * 0.42 / 3 * 1/8,
    backgroundColor: '#353632', //353632
    height: Dimensions.get('window').width * 0.42 / 3.4 ,
    width: Dimensions.get('window').width * 0.42 / 3 * 6/8,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },
  leftArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },
  leftArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: Dimensions.get('window').width * (0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderTopLeftRadius: Dimensions.get('window').width * .02,
    borderTopRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  leftArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: Dimensions.get('window').width * (0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderTopLeftRadius: Dimensions.get('window').width * .02,
    borderTopRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },
  upDownView: {
    position: 'absolute',
    top: Dimensions.get('window').width * (0.53 - 0.42)/2,
    left: Dimensions.get('window').width * (0.53 - (0.42/3))/2, 
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * 0.42,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderRadius: Dimensions.get('window').width * .02,
  },
  upArrowView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.42 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },

  upArrowFiller: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#353632',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  upArrowFillerPressed: {
    position: 'absolute',
    top: Dimensions.get('window').width * (7/414),
    right: 0,
    backgroundColor: '#252622',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  downArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.42 / 6,
    borderLeftColor: 'green',
    borderRightWidth: Dimensions.get('window').width * 0.42 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  downArrowFiller: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  downArrowFillerUpwards: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5d5e5a',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  downArrowFillerPressed: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#252622',
    height: Dimensions.get('window').width * ( + 0.42 / 3) ,
    width: Dimensions.get('window').width * 0.42 / 3,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },

  DPadCenterCircleView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.42 / 3 ,
    right: 0,
    backgroundColor: '#353632',
    height: Dimensions.get('window').width * 0.42 / 3,
    width: Dimensions.get('window').width * 0.42 / 3,
  }
});

module.exports = DPad;

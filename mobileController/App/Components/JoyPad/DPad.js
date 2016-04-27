const React = require('react-native');

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
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.017+ 0.4 / 3) } : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null]}>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {left: -Dimensions.get('window').width * 0.4  * 1/8, height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  width: Dimensions.get('window').width * 0.1 * 1.1 , borderBottomLeftRadius: Dimensions.get('window').width * .02,  borderBottomRightRadius: Dimensions.get('window').width * .02, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.left ? { height: Dimensions.get('window').width * (0.4 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.right ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0,    height: Dimensions.get('window').width * (0.4 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.4 / 3} : null,
                              this.props.currentButtonPresses.up ? {height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down  ? {right: Dimensions.get('window').width * 0.4 / 3 * 1/8 + Dimensions.get('window').width * (0.5/375), height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
              <View style={[styles.rightArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622'} : null,
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.017+ 0.4 / 3) } : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  width: Dimensions.get('window').width * 0.1 * 1.1 , borderBottomLeftRadius: Dimensions.get('window').width * .02,  borderBottomRightRadius: Dimensions.get('window').width * .02, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#353632'} : null,
                              this.props.currentButtonPresses.right ? { height: Dimensions.get('window').width * (0.4 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.left ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.4 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.4 / 3} : null,
                              this.props.currentButtonPresses.up ? {right: Dimensions.get('window').width * 0.4 / 3 * 1/8 + Dimensions.get('window').width * (0.5/375), height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.down  ? {height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
            </View>
            <View style={styles.upDownView}>
              <View style={[styles.upArrowView, 
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'}  : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.017+ 0.4 / 3)} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null]}>
                <View style={[styles.arrowInsideView, 
                              this.props.currentButtonPresses.up ? { height: Dimensions.get('window').width * (0.4 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.down ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.4 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.4 / 3} : null,
                              this.props.currentButtonPresses.left ? {right: Dimensions.get('window').width * 0.4 / 3 * 1/8  + Dimensions.get('window').width * (0.5/375), height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right ? {height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
              </View>
              <View style={[styles.downArrowView, 
                            !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {borderLeftColor: '#252622', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.left ? {borderLeftColor: '#252622', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.right ? {borderLeftColor: '#5d5e5a', borderRightColor: '#252622'} : null,
                            this.props.currentButtonPresses.up ? {borderLeftColor: '#5d5e5a', borderRightColor: '#5d5e5a'} : null,
                            this.props.currentButtonPresses.down ? {borderLeftColor: '#252622', borderRightColor: '#252622', height: Dimensions.get('window').width * (0.017+ 0.4 / 3)} : null]}>
                <View style={[styles.arrowInsideView, 
                              !this.props.currentButtonPresses.down && !this.props.currentButtonPresses.left && !this.props.currentButtonPresses.right && !this.props.currentButtonPresses.up ? {top: -1 * Dimensions.get('window').width * (10/375) , right: 0, height: Dimensions.get('window').width * (0.4 / 2.6), width: Dimensions.get('window').width * 0.4 / 3} : null,
                              this.props.currentButtonPresses.down ? { height: Dimensions.get('window').width * (0.4 / 3), borderBottomLeftRadius: 0, borderBottomRightRadius: 0} : null,
                              this.props.currentButtonPresses.up ? {top: -1 * Dimensions.get('window').width * (8/375) , right: 0, height: Dimensions.get('window').width * (0.4 / 3.5 + 0.02), width: Dimensions.get('window').width * 0.4 / 3} : null,
                              this.props.currentButtonPresses.left ? {height: Dimensions.get('window').width * (+ 0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null,
                              this.props.currentButtonPresses.right ? {right: Dimensions.get('window').width * 0.4 / 3 * 1/8 + Dimensions.get('window').width * (0.5/375), height: Dimensions.get('window').width * (0.4 / 3)  ,  borderBottomLeftRadius: 0,  borderBottomRightRadius:0, borderBottomWidth: Dimensions.get('window').width * 0.01, borderBottomColor: '#252622'} : null]}/>
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
    left: Dimensions.get('window').width * (0.4*2 - 0.56) /2 , 
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
    top: Dimensions.get('window').width * (0.53 - 0.4)/2,
    left: Dimensions.get('window').width * (0.53 - (0.4/3))/2, 
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * 0.4,
    width: Dimensions.get('window').width * 0.4 / 3,
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
    height: Dimensions.get('window').width * (0.4 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.4 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.4 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },
  arrowInsideView: {
    position: 'absolute',
    top: 0,
    right: Dimensions.get('window').width * 0.4 / 3 * 1/8,
    backgroundColor: '#353632',
    height: Dimensions.get('window').width * 0.4 / 3.4 ,
    width: Dimensions.get('window').width * 0.4 / 3 * 6/8,
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },
  leftArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.4 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.4 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.4 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },
  upDownView: {
    position: 'absolute',
    top: Dimensions.get('window').width * (0.53 - 0.4)/2,
    left: Dimensions.get('window').width * (0.53 - (0.4/3))/2, 
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * 0.4,
    width: Dimensions.get('window').width * 0.4 / 3,
    borderRadius: Dimensions.get('window').width * .02,
  },
  upArrowView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.4 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.4 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.4 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
    transform: [
      {rotate: '180deg'},
    ]
  },
  downArrowView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width * ( + 0.4 / 3) ,
    width: 0,
    borderLeftWidth: Dimensions.get('window').width * 0.4 / 6,
    borderLeftColor: '#353632',
    borderRightWidth: Dimensions.get('window').width * 0.4 / 6,
    borderRightColor: '#353632',
    borderBottomLeftRadius: Dimensions.get('window').width * .02,
    borderBottomRightRadius: Dimensions.get('window').width * .02,
  },
  DPadCenterCircleView: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.4 / 3 ,
    right: 0,
    backgroundColor: '#353632',
    height: Dimensions.get('window').width * 0.4 / 3,
    width: Dimensions.get('window').width * 0.4 / 3,
  }
});

module.exports = DPad;

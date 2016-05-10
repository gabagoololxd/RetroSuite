const React = require('react-native');
const Ionicon = require('react-native-vector-icons/Ionicons');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  SliderIOS
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

var initialValue;

class PauseModal extends React.Component {
  componentDidMount() {
    initialValue = this.props.sliderValue;
  }
  render() {
    return (
      <View style={styles.pauseModal}>
        <Text allowFontScaling={false} style={styles.pauseText}>Your Game is Paused</Text>
        <TouchableOpacity style={styles.resume} onPress={this.props._resume.bind(this)}>
          <Ionicon name="play" style={styles.resumeIcon} size={windowWidth * (38/375)} allowFontScaling={false} color="white"/>
          <Text allowFontScaling={false} style={styles.resumeText}>Resume Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={this.props._pairController.bind(this)}>
          <Ionicon name="qr-scanner" style={styles.pairIcon} size={windowWidth * (38/375)} allowFontScaling={false} color="white"/>
          <Text allowFontScaling={false} style={styles.pairText}>Re-pair controller</Text>
        </TouchableOpacity>

        <View style={styles.setABXYOverlap}>
          <Text allowFontScaling={false} style={styles.setABXYOverlapText}>Set ABXY Overlap Area:</Text>
          <SliderIOS
            style={{width: windowHeight/2}}
            value={initialValue}
            maximumValue={Math.sqrt(2)}
            minimumValue={1}
            minimumTrackTintColor={'#99559e'}
            maximumTrackTintColor={'white'}
            onValueChange={ this.props._onValueChange.bind(this) }/>
        </View>

        <View style={[styles.circleRepresentations, {transform: [{translate:[ windowWidth * 0.1* this.props.sliderValue/2 - windowWidth * 0.1* 1/2, windowWidth * 0.1* this.props.sliderValue/2 - windowWidth * 0.1* 1/2]} ] }]}>
          <View 
            style={{
              position: 'absolute',
              bottom: windowWidth * 0.28,
              right: windowWidth * 0.2, 
              width: windowWidth * 0.1 * this.props.sliderValue,
              height: windowWidth * 0.1 * this.props.sliderValue,
              borderRadius: windowWidth * 0.1 * this.props.sliderValue/2,
              backgroundColor: 'rgba(153,85,158,0.4)'}}/>
          <View 
            style={{
              position: 'absolute',
              bottom: windowWidth  * (0.28) - Math.sqrt(8* windowWidth * 0.1/2 * windowWidth * 0.1/2)/2,
              right: windowWidth * 0.2 + Math.sqrt(8* windowWidth * 0.1/2 * windowWidth * 0.1/2)/2, 
              width: windowWidth * 0.1* this.props.sliderValue,
              height: windowWidth * 0.1* this.props.sliderValue,
              borderRadius: windowWidth * 0.1* this.props.sliderValue/2,
              backgroundColor: 'rgba(153,85,158,0.4)'}}/>
          <View 
            style={{
              position: 'absolute',
              bottom: windowWidth  * (0.28) - Math.sqrt(8* windowWidth * 0.1/2 * windowWidth * 0.1/2)/2,
              right: windowWidth * (0.2) - Math.sqrt(8* windowWidth * 0.1/2 * windowWidth * 0.1/2)/2, 
              width: windowWidth * 0.1* this.props.sliderValue,
              height: windowWidth * 0.1* this.props.sliderValue,
              borderRadius: windowWidth * 0.1* this.props.sliderValue/2,
              backgroundColor: 'rgba(153,85,158,0.4)'}}/>

          <View 
            style={{
              position: 'absolute',
              bottom: windowWidth  * (0.28) - Math.sqrt(8* windowWidth * 0.1/2 * windowWidth * 0.1/2),
              right: windowWidth * 0.2, 
              width: windowWidth * 0.1* this.props.sliderValue,
              height: windowWidth * 0.1* this.props.sliderValue,
              borderRadius: windowWidth * 0.1* this.props.sliderValue/2,
              backgroundColor: 'rgba(153,85,158,0.4)'}}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  pauseModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: windowWidth,
    width: windowHeight,
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  pauseText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: windowWidth * (30/375),
    fontWeight: 'bold',
    marginTop: windowWidth * -0.1,
  },
  resume: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.15
  },
  resumeIcon: {
    marginTop: windowWidth * (5/375)
  },
  resumeText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: windowWidth * (20/375),
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.045
  },
  pair: {
    marginTop: windowWidth * 0.05,
    flexDirection: 'row',
  },
  pairIcon: {
    marginTop: windowWidth * (6/375)
  },
  pairText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: windowWidth * (20/375),
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.045
  },
  circleRepresentations: {
    position: 'absolute',
    bottom: windowWidth * -0,
    right: windowWidth * 0, 
  },
  setABXYOverlap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setABXYOverlapText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: windowWidth * (20/375),
    fontWeight: 'bold',
    marginTop: windowWidth * 0.1
  }
});

module.exports = PauseModal;

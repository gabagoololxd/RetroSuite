const React = require('react-native');
const Ionicon = require('react-native-vector-icons/Ionicons');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

class PauseModal extends React.Component {
  render() {
    return (
      <View style={styles.pauseModal}>
        <Text allowFontScaling={false} style={styles.pauseText}>Your Game is Paused</Text>
        <TouchableOpacity style={styles.resume} onPress={this.props._resume.bind(this)}>
          <Ionicon name="ios-play-outline" style={styles.resumeIcon} size={windowWidth * (50/375)} allowFontScaling={false} color="white"/>
          <Text allowFontScaling={false} style={styles.resumeText}>Resume Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={this.props._pairController.bind(this)}>
          <Ionicon name="ios-barcode-outline" style={styles.pairIcon} size={windowWidth * (50/375)} allowFontScaling={false} color="white"/>
          <Text allowFontScaling={false} style={styles.pairText}>Re-pair controller</Text>
        </TouchableOpacity>
      </View>
    );
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
    marginTop: windowWidth * -0.2,
  },
  resume: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.2
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
  pairText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: windowWidth * (20/375),
    fontWeight: 'bold',
    marginLeft: windowWidth * 0.05,
    marginTop: windowWidth * 0.045
  },
});

module.exports = PauseModal;

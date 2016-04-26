var React = require('react-native');
var Ionicon = require('react-native-vector-icons/Ionicons');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

class PauseModal extends React.Component {
  render() {
    return (
      <View style={styles.pauseModal}>
        <Text style={styles.pauseText}>Your Game is Paused</Text>
        <TouchableOpacity style={styles.resume} onPress={this.props._resume.bind(this)}>
          <Ionicon name="ios-play-outline" style={styles.resumeIcon} size={50} allowFontScaling={false} color="white"/>
          <Text style={styles.resumeText}>Resume Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pair} onPress={this.props._pairController.bind(this)}>
          <Ionicon name="ios-barcode-outline" style={styles.pairIcon} size={50} allowFontScaling={false} color="white"/>
          <Text style={styles.pairText}>Re-pair controller</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  pauseModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
  },
  pauseText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: Dimensions.get('window').width * -0.2,
  },
  resume: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').width * 0.2
  },
  resumeText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').width * 0.045
  },
  pair: {
    marginTop: Dimensions.get('window').width * 0.05,
    flexDirection: 'row',
  },
  pairText: {
    fontFamily: 'docker',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: Dimensions.get('window').width * 0.05,
    marginTop: Dimensions.get('window').width * 0.045
  },
});

module.exports = PauseModal;

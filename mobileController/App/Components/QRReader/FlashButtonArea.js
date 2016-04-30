const React = require('react-native');
const IconIon = require('react-native-vector-icons/Ionicons');


const {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Text
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

// This presentational component renders the brackets in the center of the camera
class FlashButtonArea extends React.Component { 
  render() {
    return (
      <View style={styles.bottomButtonContainer}>
        <TouchableWithoutFeedback onPress={this.props._torchEnabled.bind(this)}  underlayColor={'#FC9396'}>
          {this.props.cameraTorchToggle === 0 ? 
            <View style={styles.flashButton}>
              <IconIon name="ios-bolt-outline" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
              <Text style={styles.flashButtonText} allowFontScaling={false}>Flash Off</Text>
            </View> 
          : 
            <View style={styles.flashButton}>
              <IconIon name="ios-bolt" size={40} allowFontScaling={false} color="rgba(237,237,237,0.5)" style={styles.flashIcon} />
              <Text style={styles.flashButtonText} allowFontScaling={false}>Flash On</Text>
            </View>
          }
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

module.exports = FlashButtonArea;

const styles = StyleSheet.create({
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 15
  },
  flashButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  flashIcon: {
    flex: 1,
    width: 52.5,
    height: 55,
    backgroundColor: 'transparent'
  },
  flashButtonText: {
    flex: 1,
    fontFamily: 'docker',
    marginBottom: 10,
    marginLeft: -20,
    color: '#ededed',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
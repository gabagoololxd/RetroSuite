const React = require('react-native');

const {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Text,
  TouchableHighlight
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
class CameraPermissionsModal extends React.Component { 
  render() {
    return (
      <Modal animated={true}
             transparent={true}
             visible={this.props.showCameraPermissionsModal}>
        <View style={styles.cameraPermissionsAlert} pointerEvents='box-none'> 
          <Text style={styles.useYourCameraTitleText}>Use your camera?</Text>
          <View style={styles.line}/>
          <Text style={styles.useYourCameraDescriptionText}>Pairing your controller requires access to your camera.</Text>

          <TouchableHighlight style={styles.yesButton}
                              onPress={this.props._openCameraPermissions.bind(this)}
                              underlayColor='#8d4e91'>
            <Text style={styles.yesText}>Yes</Text>
          </TouchableHighlight>
        </View>
      </Modal>

    );
  }
}

module.exports = CameraPermissionsModal;

const styles = StyleSheet.create({
  cameraPermissionsAlert: {
    flex: 1,
    marginTop: 0.32 * windowHeight,
    marginBottom: windowWidth * (310/414),
    marginHorizontal: windowWidth * (35/414),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: windowWidth * (20/414),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  useYourCameraTitleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: windowWidth * (20/414)
  },
  line: {
    marginTop: windowWidth * (10/414),
    width: windowWidth * (175/414),
    height: 2,
    backgroundColor: '#d3d3d3'
  },
  useYourCameraDescriptionText: {
    marginTop: windowWidth * (10/414),
    textAlign: 'center',
    fontSize: windowWidth * (16/414),
    lineHeight: windowWidth * (20/414),
    fontWeight: '500'

  },
  yesButton: {
    height: windowWidth * (50/414),
    width: windowWidth * (180/375),
    marginTop: windowWidth * (15/375),
    borderRadius: windowWidth * (10/375),
    backgroundColor: '#99559e',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  yesText: {
    fontSize: windowWidth * (18/414),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
});
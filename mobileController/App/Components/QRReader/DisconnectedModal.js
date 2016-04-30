const React = require('react-native');
const IconIon = require('react-native-vector-icons/Ionicons');
const { BlurView, VibrancyView } = require('react-native-blur');

const {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  AppStateIOS,
  Image,
  Animated,
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

// This presentational component renders the modal that appears when the controller disconnects
class DisconnectedModal extends React.Component { 
  render() {
    return (
      <Modal animated={true}
             transparent={true}
             visible={this.props.showDisconnectedModal}>
        <Animated.View style={{opacity: this.props.fadeAnim, flex: 1}}>
          <Image style={styles.disconnectedAlert}>
           <BlurView blurType="light" style={styles.blur}>

                <View style={styles.disconnectedIcons}>
                  <View style={styles.desktopIcon}>
                    <IconIon name="ios-monitor-outline" size={windowWidth * (85/375)} allowFontScaling={false} color="rgba(0,0,0,0.8)"/>
                  </View>
                  <View style={styles.disconnectedDashXDashIcon}>
                    <IconIon name="ios-minus-empty" size={windowWidth * (60/375)} allowFontScaling={false} color="rgba(0,0,0,0.8)" style={styles.leftDashIcon} />
                    <IconIon name="ios-close-empty" size={windowWidth * (60/375)} allowFontScaling={false} color="rgba(0,0,0,0.8)" style={styles.xIcon} />
                    <IconIon name="ios-minus-empty" size={windowWidth * (60/375)} allowFontScaling={false} color="rgba(0,0,0,0.8)" style={styles.rightDashIcon} />
                  </View>
                  <View style={styles.controllerIcon}>
                    <IconIon name="ios-game-controller-a-outline" size={windowWidth * (85/375)} allowFontScaling={false} color="rgba(0,0,0,0.8)" />
                  </View>
                </View>
                <Text style={styles.disconnectedTitleText}>Controller Disconnected</Text>
              

            </BlurView>
          </Image>
        </Animated.View>
      </Modal>
    );
  }
}

module.exports = DisconnectedModal;

const styles = StyleSheet.create({
  disconnectedAlert: {
    flex: 1,
    marginTop: 0.32 * windowHeight,
    marginBottom: windowWidth * (310/414),
    marginHorizontal: windowWidth * (35/414),
    backgroundColor: 'transparent',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  blur: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  disconnectedIcons: {
    flex: 3,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: windowWidth * (5/375)
  },
  controllerIcon: {
    width: windowWidth * (90/375),
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingRight: windowWidth * (0/375)
  },
  desktopIcon: {
    width: windowWidth * (90/375),
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingLeft: windowWidth * (0/375)
  },
  disconnectedDashXDashIcon: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  leftDashIcon: {
    backgroundColor: 'transparent',
  },
  xIcon: {
    backgroundColor: 'transparent',
  },
  rightDashIcon: {
    backgroundColor: 'transparent',
  },
  disconnectedTitleText: {
    flex: 1,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: windowWidth * (22/414),
    color: 'rgba(0,0,0,0.8)',
    paddingBottom: windowWidth * (15/375)
  },
});
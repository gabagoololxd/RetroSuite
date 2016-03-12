var React = require('react-native');
var IconIon = require('react-native-vector-icons/Ionicons');
var Orientation = require('react-native-orientation');
var api = require('../Utils/api');
var Settings = require('./Settings');
var _ = require('lodash');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  StatusBarIOS,
  VibrationIOS,
  PanResponder
} = React;

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circleButtonSize: undefined,
      arrowButtonSize: undefined,
      selectStartButtonSize: undefined,
    }
  }

  //NOT USED FOR NOW: Will be used to make D-pad a joystick
  // componentWillMount() {
  //     this._panResponder = PanResponder.create({
  //       // Ask to be the responder:
  //       onStartShouldSetPanResponder: (evt, gestureState) => true,
  //       onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
  //       onMoveShouldSetPanResponder: (evt, gestureState) => true,
  //       onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

  //       onPanResponderGrant: (evt, gestureState) => {
  //         // The guesture has started. Show visual feedback so the user knows
  //         // what is happening!
  //         console.log('grant gestureState', gestureState.numberActiveTouches);
  //         // console.log('grant evt', evt);


  //         // gestureState.{x,y}0 will be set to zero now
  //       },
  //       onPanResponderMove: (evt, gestureState) => {
  //         // The most recent move distance is gestureState.move{X,Y}
  //         console.log('move gestureState', gestureState.numberActiveTouches);
  //         // console.log('move evt', evt);



  //         // The accumulated gesture distance since becoming responder is
  //         // gestureState.d{x,y}
  //       },
  //       onPanResponderTerminationRequest: (evt, gestureState) => true,
  //       onPanResponderRelease: (evt, gestureState) => {
  //         // The user has released all touches while this view is the
  //         // responder. This typically means a gesture has succeeded
  //         console.log('release');
  //       },
  //       onPanResponderTerminate: (evt, gestureState) => {
  //         // Another component has become the responder, so this gesture
  //         // should be cancelled
  //       },
  //       onShouldBlockNativeResponder: (evt, gestureState) => {
  //         // Returns whether this component should block native components from becoming the JS
  //         // responder. Returns true by default. Is currently only supported on android.
  //         return true;
  //       },
  //     });
  //   }


  componentDidMount() {
    Orientation.lockToLandscapeRight(); //this will lock the view to Landscape

    //buttons must scale with size of the phone   
    if(Dimensions.get('window').width===375) { //iPhone 6/6s
      this.setState({
        circleButtonSize: 62,
        arrowButtonSize: 52,
        selectStartButtonSize: 45
      })
    } else if (Dimensions.get('window').width===414) { //iPhone 6+/6s+
      this.setState({
        circleButtonSize: 68,
        arrowButtonSize: 58,
        selectStartButtonSize: 45
      })
    } else if (Dimensions.get('window').width===320) { //iPhone 5/5s
      this.setState({
        circleButtonSize: 53,
        arrowButtonSize: 44,
        selectStartButtonSize: 40
      })
    }
  }

  //Right thumb buttons: A, B, X, Y
  _APressIn() {
    console.log('A pressed');
    // VibrationIOS.vibrate()
    // return true;
  }
  _APressOut(event) {
    console.log('A released')
  }

  _BPressIn() {
    console.log('B pressed')
    // return true;
  }
  _BPressOut() {
    console.log('B released')
  }

  _XPressIn() {
    console.log('X pressed')
    // return true;
  }
  _XPressOut() {
    console.log('X released')
  }

  _YPressIn() {
    console.log('Y pressed')
    // return true;
  }
  _YPressOut() {
    console.log('Y released')
  }

  //Left thumb buttons: Direction pad
  _upArrowPressIn() {
    console.log('up arrow pressed')
    // return true;
  }
  _upArrowPressOut() {
    console.log('up arrow released')
  }

  _downArrowPressIn() {
    console.log('down arrow pressed')
    // return true;
  }
  _downArrowPressOut() {
    console.log('down arrow released')
  }

  _rightArrowPressIn() {
    console.log('right arrow pressed')
    // return true;
  }
  _rightArrowPressOut() {
    console.log('right arrow released')
  }

  _leftArrowPressIn() {
    console.log('left arrow pressed')
    // return true;
  }
  _leftArrowPressOut() {
    console.log('left arrow released')
  }

  //Index finger buttons: Left and Right Shoulders. TODO: implement shoulder buttons on screen, or ideally with volume rocker
  _rightShoulderPressIn() {
    console.log('right shoulder pressed')
    // return true;
  }
  _rightShoulderPressOut() {
    console.log('right shoulder released')
  }

  _leftShoulderPressIn() {
    console.log('left shoulder pressed')
    // return true;
  }
  _leftShoulderPressOut() {
    console.log('left shoulder released')
  }

  //Start and Select buttons; never held down, so an onPress event is used instead of an onPressIn and onPressOut pair
  _startPress() {
    console.log('start pressed')
  }
  _selectPress() {
    console.log('select released')
  }

  _onResponderTerminationRequest(evt) {
    console.log('termination request');
    return false;
  }

  _onStartShouldSetResponderCapture(evt) {
    console.log('button pressed')
    // console.log(evt.nativeEvent.touches);
    console.log('X:', evt.nativeEvent.locationX, 'Y:', evt.nativeEvent.locationY);
    // return true;
  }

  _onResponderRelease() {
    console.log('button released');
  } 

  _onResponderTerminate() {
    console.log('has been terminated');
  }

  render() {
    StatusBarIOS.setHidden('true');
    return (
      <View style={styles.imageContainer}>
        <Image source={require('./Assets/snescontrollercropped.jpg')} style={styles.image}> 

          <View style={styles.AButton} onTouchStart={this._APressIn.bind(this)} onTouchEnd={this._APressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#a82530"/>
          </View>
          <View style={styles.BButton} onTouchStart={this._BPressIn.bind(this)} onTouchEnd={this._BPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#d9a04c"/>
          </View>
          <View style={styles.XButton} onTouchStart={this._XPressIn.bind(this)} onTouchEnd={this._XPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#3645ba"/>
          </View>
          <View style={styles.YButton} onTouchStart={this._YPressIn.bind(this)} onTouchEnd={this._YPressOut.bind(this)}> 
            <IconIon name="record" size={this.state.circleButtonSize} color="#428a43"/>
          </View>

          <View style={styles.upButton} onTouchStart={this._upArrowPressIn.bind(this)}  onTouchEnd={this._upArrowPressOut.bind(this)}> 
            <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
          </View>
          <View style={styles.downButton} onTouchStart={this._downArrowPressIn.bind(this)} onTouchEnd={this._downArrowPressOut.bind(this)}> 
            <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
          </View>
          <View style={styles.leftButton} onTouchStart={this._leftArrowPressIn.bind(this)} onTouchEnd={this._leftArrowPressOut.bind(this)}> 
            <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
          </View>
          <View style={styles.rightButton} onTouchStart={this._rightArrowPressIn.bind(this)} onTouchEnd={this._rightArrowPressOut.bind(this)}> 
            <IconIon name="stop" size={this.state.arrowButtonSize} color="rgba(0,0,0,0.2)"/>
          </View>


          <View style={styles.selectButton}> 
            <TouchableOpacity onPressIn={this._selectPress.bind(this)} onPressOut={this._leftArrowPressOut.bind(this)} >
              <IconIon name="edit" size={this.state.selectStartButtonSize} color="rgba(0,0,0,0.08)"/>
            </TouchableOpacity>
          </View>
          <View style={styles.startButton}> 
            <TouchableOpacity onPressIn={this._startPress.bind(this)} onPressOut={this._rightArrowPressOut.bind(this)}>
              <IconIon name="edit" size={this.state.selectStartButtonSize} color="rgba(0,0,0,0.08)"/>
            </TouchableOpacity>
          </View>

        </Image>
      </View>

    );
  }
}

var styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').height,
    height: Dimensions.get('window').width,
  },
  AButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.3875,
    left: Dimensions.get('window').height * 0.848,
  },
  BButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.5215,
    left: Dimensions.get('window').height * 0.7525,
  },
  XButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.255,
    left: Dimensions.get('window').height * 0.752,
  },
  YButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.3875,
    left: Dimensions.get('window').height * 0.655,
  },
  rightButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.405,
    left: Dimensions.get('window').height * 0.24,
  },
  downButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.51,
    left: Dimensions.get('window').height * 0.18,
  },
  upButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.30,
    left: Dimensions.get('window').height * 0.18,
  },
  leftButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.405,
    left: Dimensions.get('window').height * 0.12,
  },
  selectButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.47,
    left: Dimensions.get('window').height * 0.38,
  },
  startButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.47,
    left: Dimensions.get('window').height * 0.49,
  }
});

module.exports = ControllerView;
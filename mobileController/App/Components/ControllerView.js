var React = require('react-native');
var Ionicon = require('react-native-vector-icons/Ionicons');
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');
var _ = require('lodash');
var Orientation = require('react-native-orientation');
var utils = require('../Utils/utils');
var DPad = require('./DPad')

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBarIOS,
  PanResponder,
  Platform
} = React;

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to scale sizes of D-Pad depending on phone resolution
      iPhoneSize: undefined,
      //set to true when game is paused
      showPauseModal: false,
    };
    // TODO: pause and resume the game through websockets without using global scope
    global.pause = () => {
      this.setState({showPauseModal: true});
    };
    global.resume = () => {
      this.setState({showPauseModal: false});
    };
    global.onclose = () => {
      navigator = this.props.navigator;
      turnCameraOn = this.props.route.turnCameraOn.bind(this);
      navigator.pop();
      Orientation.lockToPortrait();
      turnCameraOn();
    };
  }

  componentDidMount() {

    Orientation.lockToLandscapeRight(); //this will lock the view to Landscape

    //buttons must scale with size of the phone (note: a zoomed iphone 6+ is a regular iphone 6, a zoomed iphone 6 is a regular iphone 5)
    if (Platform.OS === 'ios') {
      if(Dimensions.get('window').width===375) { //iPhone 6/6s
        this.setState({
          iPhoneSize: 'iPhone6',
        })
      } else if (Dimensions.get('window').width===414) { //iPhone 6+/6s+
        this.setState({
          iPhoneSize: 'iPhone6+',
        })
      } else if (Dimensions.get('window').width===320) { //iPhone 5/5s/SE
        this.setState({
          iPhoneSize: 'iPhone5',
        })
      }
    }

  }

  /////////////////////////////////////////////////////////////////////
  //Right thumb buttons: A, B, X, Y
  /////////////////////////////////////////////////////////////////////
  _APressIn() {
    utils.Press('a'); 
  }
  _APressOut() {
    utils.Release('a'); 
  }

  _BPressIn() {
    utils.Press('b'); 
  }
  _BPressOut() {
    utils.Release('b'); 
  }

  _XPressIn() {
    utils.Press('x'); 
  }
  _XPressOut() {
    utils.Release('x'); 
  }

  _YPressIn() {
    utils.Press('y'); 
  }
  _YPressOut() {
    utils.Release('y'); 
  }

  /////////////////////////////////////////////////////////////////////
  //Left thumb buttons: Direction pad
  /////////////////////////////////////////////////////////////////////
  _upArrowPressIn() {
    utils.Press('up');
  }
  _upArrowPressOut() {
    utils.Release('up');
  }

  _downArrowPressIn() {
    utils.Press('down');
  }
  _downArrowPressOut() {
    utils.Release('down');
  }

  _rightArrowPressIn() {
    utils.Press('right');
  }
  _rightArrowPressOut() {
    utils.Release('right');
  }

  _leftArrowPressIn() {
    utils.Press('left');
  }
  _leftArrowPressOut() {
    utils.Release('left');
  }

  /////////////////////////////////////////////////////////////////////
  //Shoulder buttons: Left and Right Index Finger Triggers.
  /////////////////////////////////////////////////////////////////////
  _rightShoulderPressIn() {
    utils.Press('r-shoulder');
  }
  _rightShoulderPressOut() {
    utils.Release('r-shoulder');
  }

  _leftShoulderPressIn() {
    utils.Press('l-shoulder');
  }
  _leftShoulderPressOut() {
    utils.Release('l-shoulder');
  }

  /////////////////////////////////////////////////////////////////////
  //Start and Select buttons
  /////////////////////////////////////////////////////////////////////
  _startPressIn() {
    utils.Press('start');
  }
  _startPressOut() {
    utils.Release('start');
  }

  _selectPressIn() {
    utils.Press('select');
  }
  _selectPressOut() {
    utils.Release('select');
  }

  /////////////////////////////////////////////////////////////////////
  //Pause button and button options while game is paused
  /////////////////////////////////////////////////////////////////////
  _pause() {
    var controller = this;
    utils.Pause(function() {
      controller.setState({showPauseModal: true});
    });
  }
  _resume() {
    var controller = this;
    utils.Resume(function() {
      controller.setState({showPauseModal: false});
    });
  }
  _pairController() {
    navigator = this.props.navigator;
    turnCameraOn = this.props.route.turnCameraOn.bind(this);
    utils.RePairController(function() {
      navigator.pop();
      Orientation.lockToPortrait();
      turnCameraOn();
    });
  }

  render() {
    StatusBarIOS.setHidden('true');
    return (
      <View style={styles.imageContainer}>
        <Image source={require('./Assets/snescontrollercroppedlabels.jpg')} style={styles.image}>

          <View style={styles.AButton} onTouchStart={this._APressIn.bind(this)} onTouchEnd={this._APressOut.bind(this)}/>
          <View style={styles.BButton} onTouchStart={this._BPressIn.bind(this)} onTouchEnd={this._BPressOut.bind(this)}/>
          <View style={styles.XButton} onTouchStart={this._XPressIn.bind(this)} onTouchEnd={this._XPressOut.bind(this)}/>
          <View style={styles.YButton} onTouchStart={this._YPressIn.bind(this)} onTouchEnd={this._YPressOut.bind(this)}/>

          <DPad style={styles.DPad}
                radius={Dimensions.get('window').width * 0.21}
                absolutePositionOfDPadCenter={{'x': Dimensions.get('window').width * 0.473, 'y': Dimensions.get('window').height * 0.21}}

                onUpArrowPress={this._upArrowPressIn.bind(this)}
                onDownArrowPress={this._downArrowPressIn.bind(this)}
                onLeftArrowPress={this._leftArrowPressIn.bind(this)}
                onRightArrowPress={this._rightArrowPressIn.bind(this)}

                onUpArrowRelease={this._upArrowPressOut.bind(this)}
                onDownArrowRelease={this._downArrowPressOut.bind(this)}
                onLeftArrowRelease={this._leftArrowPressOut.bind(this)}
                onRightArrowRelease={this._rightArrowPressOut.bind(this)}/>

          <View style={styles.leftShoulderButton} onTouchStart={this._leftShoulderPressIn.bind(this)} onTouchEnd={this._leftShoulderPressOut.bind(this)}/>
          <View style={styles.rightShoulderButton} onTouchStart={this._rightShoulderPressIn.bind(this)} onTouchEnd={this._rightShoulderPressOut.bind(this)}/>

          <View style={styles.selectButton} onTouchStart={this._selectPressIn.bind(this)} onTouchEnd={this._selectPressOut.bind(this)}/>
          <View style={styles.startButton} onTouchStart={this._startPressIn.bind(this)} onTouchEnd={this._startPressOut.bind(this)}/>

          <TouchableOpacity style={styles.pauseButton} onPress={this._pause.bind(this)}>
            <FontAwesomeIcon name="pause-circle" size={50} allowFontScaling={false} color="#6b676e"/>
          </TouchableOpacity>

          {this.state.showPauseModal ? 
            <View style={styles.pauseModal}>
              <Text style={styles.pauseText}>Your Game is Paused</Text>
              <TouchableOpacity style={styles.resume} onPress={this._resume.bind(this)}>
                <Ionicon name="ios-play-outline" style={styles.resumeIcon} size={50} allowFontScaling={false} color="white"/>
                <Text style={styles.resumeText}>Resume Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pair} onPress={this._pairController.bind(this)}>
                <Ionicon name="ios-barcode-outline" style={styles.pairIcon} size={50} allowFontScaling={false} color="white"/>
                <Text style={styles.pairText}>Re-pair controller</Text>
              </TouchableOpacity>
            </View>
          : 
            null
          }

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
    top: Dimensions.get('window').width * 0.36,
    left: Dimensions.get('window').height * 0.83,
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    borderRadius: Dimensions.get('window').width * 0.23 /2,
    backgroundColor: 'transparent'
  },
  BButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.51,
    left: Dimensions.get('window').height * 0.73,
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    borderRadius: Dimensions.get('window').width * 0.23 /2,
    backgroundColor: 'transparent'
  },
  XButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.21,
    left: Dimensions.get('window').height * 0.72,
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    borderRadius: Dimensions.get('window').width * 0.23 /2,
    backgroundColor: 'transparent'
  },
  YButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.36,
    left: Dimensions.get('window').height * 0.62,
    width: Dimensions.get('window').width * 0.23,
    height: Dimensions.get('window').width * 0.23,
    borderRadius: Dimensions.get('window').width * 0.23 /2,
    backgroundColor: 'transparent'
  },
  DPad: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    backgroundColor: 'red',
  },
  leftShoulderButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0,
    left: Dimensions.get('window').height * 0.025,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'transparent'
  },
  rightShoulderButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0,
    right: Dimensions.get('window').height * 0.025,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'transparent'
  },
  selectButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.5,
    left: Dimensions.get('window').height * 0.36,
    width: Dimensions.get('window').width * 0.16,
    height: 20,
    transform: [
      {rotate: '140deg'}
    ],
    backgroundColor: 'transparent'
  },
  startButton: {
    position: 'absolute',
    top: Dimensions.get('window').width * 0.5,
    left: Dimensions.get('window').height * 0.47,
    width: Dimensions.get('window').width * 0.16,
    height: 20,
    transform: [
      {rotate: '140deg'}
    ],
    backgroundColor: 'transparent'
  },
  pauseButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
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
  }
});

module.exports = ControllerView;

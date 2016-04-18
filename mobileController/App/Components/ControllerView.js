var React = require('react-native');
var FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');
var Orientation = require('react-native-orientation');
var _ = require('lodash');
var utils = require('../Utils/utils');
var DPad = require('./DPad');
var PauseModal = require('./PauseModal');

var {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBarIOS,
} = React;

class ControllerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

          <View style={styles.AButton} onTouchStart={()=>{utils.Press('a')}} onTouchEnd={()=>{utils.Release('a')}}/>
          <View style={styles.BButton} onTouchStart={()=>{utils.Press('b')}} onTouchEnd={()=>{utils.Release('b')}}/>
          <View style={styles.XButton} onTouchStart={()=>{utils.Press('x')}} onTouchEnd={()=>{utils.Release('x')}}/>
          <View style={styles.YButton} onTouchStart={()=>{utils.Press('y')}} onTouchEnd={()=>{utils.Release('y')}}/>

          <DPad style={styles.DPad}
                radius={Dimensions.get('window').width * 0.21}
                absolutePositionOfDPadCenter={{'x': Dimensions.get('window').width * 0.473, 'y': Dimensions.get('window').height * 0.21}}

                onUpArrowPress={()=>{utils.Press('up')}}
                onDownArrowPress={()=>{utils.Press('down')}}
                onLeftArrowPress={()=>{utils.Press('left')}}
                onRightArrowPress={()=>{utils.Press('right')}}

                onUpArrowRelease={()=>{utils.Release('up')}}
                onDownArrowRelease={()=>{utils.Release('down')}}
                onLeftArrowRelease={()=>{utils.Release('left')}}
                onRightArrowRelease={()=>{utils.Release('right')}}/>

          <View style={styles.leftShoulderButton} onTouchStart={()=>{utils.Press('l-shoulder')}} onTouchEnd={()=>{utils.Release('l-shoulder')}}/>
          <View style={styles.rightShoulderButton} onTouchStart={()=>{utils.Press('r-shoulder')}} onTouchEnd={()=>{utils.Release('r-shoulder')}}/>

          <View style={styles.selectButton} onTouchStart={()=>{utils.Press('select')}} onTouchEnd={()=>{utils.Release('select')}}/>
          <View style={styles.startButton} onTouchStart={()=>{utils.Press('start')}} onTouchEnd={()=>{utils.Release('start')}}/>

          <TouchableOpacity style={styles.pauseButton} onPress={this._pause.bind(this)}>
            <FontAwesomeIcon name="pause-circle" size={50} allowFontScaling={false} color="#6b676e"/>
          </TouchableOpacity>

          {this.state.showPauseModal ? <PauseModal _resume={this._resume.bind(this)} _pairController={this._pairController.bind(this)}/> : null}

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
});

module.exports = ControllerView;

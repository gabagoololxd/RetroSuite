const React = require('react-native');
const FontAwesomeIcon = require('react-native-vector-icons/FontAwesome');
const Orientation = require('react-native-orientation');
const _ = require('lodash');

const webSocket = require('../../Utils/webSocketMethods');
const utils = require('../../Utils/utils');
const PauseModal = require('./PauseModal');
const JoyPad = require('./JoyPad');
const SelectStart = require('./SelectStart');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBarIOS,
} = React;

// This container component holds JoyPad methods, determines the touch areas of each button, determines which buttons are pressed, and what messages to send to the websocket server
class JoyPadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set to true when game is paused
      showPauseModal: false, 

      // stores the previous state of button presses; we compare to see if current button presses are different from previous
      // if so, then send a 'press' or 'release' message to the chrome app webSocket server
      previousButtonPresses: {
        a: false,
        b: false,
        x: false,
        y: false,
        lShoulder: false,
        rShoulder: false,
        up: false,
        down: false,
        left: false,
        right: false,
        start: false,
        select: false
      },

      // stores a list of currently pressed buttons
      currentButtonPresses: {
        a: false,
        b: false,
        x: false,
        y: false,
        lShoulder: false,
        rShoulder: false,
        up: false,
        down: false,
        left: false,
        right: false,
        start: false,
        select: false
      },

      // information about the current layout of each button/set of buttons: x coord, y coord, width, height
      // used to determine which area of the screen each button is taking up so later we can calculate if a touch is within the area of the button
      // filled in by _onLayout methods below
      layout: {
        DPad: undefined,
        ABXY: undefined,
        lShoulder: undefined,
        rShoulder: undefined,
        start: undefined,
        select: undefined
      }
    };

    // functions used by webSocketMethods.js defined here:
    global.pause = () => {
      this.setState({showPauseModal: true});
    };
    global.resume = () => {
      this.setState({showPauseModal: false});
    };

    // TODO: notify user that they were disconnected
    global.onclose = () => {
      navigator = this.props.navigator;
      turnCameraOn = this.props.route.turnCameraOn.bind(this);
      navigator.pop();
      Orientation.lockToPortrait();
      turnCameraOn();
    };
  }

  componentDidMount() {
    Orientation.lockToLandscapeRight(); // this will lock the view to Landscape
  }

  // Method used to pause the game and methods used while the game is paused:
  _pause() {
    const controller = this;
    webSocket.Pause(function() {
      controller.setState({showPauseModal: true});
    });
  }
  _resume() {
    const controller = this;
    webSocket.Resume(function() {
      controller.setState({showPauseModal: false});
    });
  }
  _pairController() {
    navigator = this.props.navigator;
    turnCameraOn = this.props.route.turnCameraOn.bind(this);
    webSocket.RePairController(function() {
      navigator.popToTop();
      Orientation.lockToPortrait();
      turnCameraOn();
    });
  }

  // Sets the state of layout; when the view renders, pass the information to this.state so we can calculate whether touches are within certain button areas
  // Area sizes originate from the StyleSheet
  _onLayoutABXY(e) {
    this.setState({layout: _.extend(this.state.layout, {ABXY: e.nativeEvent.layout})})
  }
  _onLayoutDPad(e) {
    this.setState({layout: _.extend(this.state.layout, {DPad: e.nativeEvent.layout})})
  }
  _onLayoutStart(e) {
    this.setState({layout: _.extend(this.state.layout, {start: e.nativeEvent.layout})})
  }
  _onLayoutSelect(e) {
    this.setState({layout: _.extend(this.state.layout, {select: e.nativeEvent.layout})})
  }
  _onLayoutLShoulder(e) {
    this.setState({layout: _.extend(this.state.layout, {lShoulder: e.nativeEvent.layout})})
  }
  _onLayoutRShoulder(e) {
    this.setState({layout: _.extend(this.state.layout, {rShoulder: e.nativeEvent.layout})})
  }

  // Touch helpers: returns true if a touch coordinate is within the area of the button
  _pressingA(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width , this.state.layout.ABXY.y + this.state.layout.ABXY.height]
    );
  }

  _pressingB(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y + this.state.layout.ABXY.height], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width , this.state.layout.ABXY.y + this.state.layout.ABXY.height]
    );
  }

  _pressingX(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2 , this.state.layout.ABXY.y/2 + this.state.layout.ABXY.height/2]
    );
  }

  _pressingY(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y + this.state.layout.ABXY.height], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y]
    );
  }

  _pressingRight(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x + this.state.layout.DPad.width, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width , this.state.layout.DPad.y + this.state.layout.DPad.height]
    );
  }

  _pressingDown(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y + this.state.layout.DPad.height], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width , this.state.layout.DPad.y + this.state.layout.DPad.height]
    );
  }

  _pressingUp(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2 , this.state.layout.DPad.y/2 + this.state.layout.DPad.height/2]
    );
  }

  _pressingLeft(coordinate) {
    return utils._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y + this.state.layout.DPad.height], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x, this.state.layout.DPad.y]
    );
  }

  _pressingLShoulder(coordinate) {
    return utils._pointInRectangle(coordinate, 
      [this.state.layout.lShoulder.x, this.state.layout.lShoulder.y],
      [this.state.layout.lShoulder.x + this.state.layout.lShoulder.width, this.state.layout.lShoulder.y + this.state.layout.lShoulder.height]
    );
  }

  _pressingRShoulder(coordinate) {
    return utils._pointInRectangle(coordinate, 
      [this.state.layout.rShoulder.x, this.state.layout.rShoulder.y],
      [this.state.layout.rShoulder.x + this.state.layout.rShoulder.width, this.state.layout.rShoulder.y + this.state.layout.rShoulder.height]
    );
  }

  _pressingSelect(coordinate) {
    return utils._pointInRectangle(coordinate, 
      [this.state.layout.select.x, this.state.layout.select.y],
      [this.state.layout.select.x + this.state.layout.select.width, this.state.layout.select.y + this.state.layout.select.height]
    );
  }

  _pressingStart(coordinate) {
    return utils._pointInRectangle(coordinate, 
      [this.state.layout.start.x, this.state.layout.start.y],
      [this.state.layout.start.x + this.state.layout.start.width, this.state.layout.start.y + this.state.layout.start.height]
    );
  }

  // This is the main function used to determine what new messages need to be sent to the chrome app websockets server
  // Called any time there is a new touch, a touch has moved, and when a touch is released
  _determinePressesAndReleases(e) {
    // List the coordinates of all the active touches on the screen
    const touchCoordinates = _.map(e.nativeEvent.touches, function(touch) {
      return [touch.pageX, touch.pageY];
    });

    // Set previousButtonPresses to be what was currentButtonPresses and re-initialize currentButtonPresses as all false
    const self = this;
    self.setState({previousButtonPresses: self.state.currentButtonPresses});
    self.setState({currentButtonPresses: {
      a: false,
      b: false,
      x: false,
      y: false,
      lShoulder: false,
      rShoulder: false,
      up: false,
      down: false,
      left: false,
      right: false,
      start: false,
      select: false
    }});
    
    // Look through each touchCoordinate; if any touchCoordinate is pressing any button, set that button to true
    _.each(touchCoordinates, function(touchCoordinate) {
      self._pressingA(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {a: true})}) : null;
      self._pressingB(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {b: true})}) : null;
      self._pressingX(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {x: true})}) : null;
      self._pressingY(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {y: true})}) : null;
      self._pressingRight(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {right: true})}) : null;
      self._pressingDown(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {down: true})}) : null;
      self._pressingUp(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {up: true})}) : null;
      self._pressingLeft(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {left: true})}) : null;
      self._pressingLShoulder(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {lShoulder: true})}) : null;
      self._pressingRShoulder(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {rShoulder: true})}) : null;
      self._pressingSelect(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {select: true})}) : null;
      self._pressingStart(touchCoordinate) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {start: true})}) : null;
    });

    console.log('state', self.state.currentButtonPresses);

    // Compare previousButtonPresses with currentButtonPresses; if there is a change, then tell the chrome app webSocket server (either press or release)
    this.state.currentButtonPresses.a !== this.state.previousButtonPresses.a ? (this.state.currentButtonPresses.a ? webSocket.Press('a') : webSocket.Release('a')) : null;
    this.state.currentButtonPresses.b !== this.state.previousButtonPresses.b ? (this.state.currentButtonPresses.b ? webSocket.Press('b') : webSocket.Release('b')) : null;
    this.state.currentButtonPresses.x !== this.state.previousButtonPresses.x ? (this.state.currentButtonPresses.x ? webSocket.Press('x') : webSocket.Release('x')) : null;
    this.state.currentButtonPresses.y !== this.state.previousButtonPresses.y ? (this.state.currentButtonPresses.y ? webSocket.Press('y') : webSocket.Release('y')) : null;
    this.state.currentButtonPresses.up !== this.state.previousButtonPresses.up ? (this.state.currentButtonPresses.up ? webSocket.Press('up') : webSocket.Release('up')) : null;
    this.state.currentButtonPresses.down !== this.state.previousButtonPresses.down ? (this.state.currentButtonPresses.down ? webSocket.Press('down') : webSocket.Release('down')) : null;
    this.state.currentButtonPresses.left !== this.state.previousButtonPresses.left ? (this.state.currentButtonPresses.left ? webSocket.Press('left') : webSocket.Release('left')) : null;
    this.state.currentButtonPresses.right !== this.state.previousButtonPresses.right ? (this.state.currentButtonPresses.right ? webSocket.Press('right') : webSocket.Release('right')) : null;
    this.state.currentButtonPresses.lShoulder !== this.state.previousButtonPresses.lShoulder ? (this.state.currentButtonPresses.lShoulder ? webSocket.Press('l-shoulder') : webSocket.Release('l-shoulder')) : null;
    this.state.currentButtonPresses.rShoulder !== this.state.previousButtonPresses.rShoulder ? (this.state.currentButtonPresses.rShoulder ? webSocket.Press('r-shoulder') : webSocket.Release('r-shoulder')) : null;
    this.state.currentButtonPresses.select !== this.state.previousButtonPresses.select ? (this.state.currentButtonPresses.select ? webSocket.Press('select') : webSocket.Release('select')) : null;
    this.state.currentButtonPresses.start !== this.state.previousButtonPresses.start ? (this.state.currentButtonPresses.start ? webSocket.Press('start') : webSocket.Release('start')) : null;
  }

  // Touch events
  // Call _determinePressesAndRelease any time there is a new touch, a touch has moved, and when a touch is released
  _onTouchStart(e) {
    console.log('Touch Start');
    this._determinePressesAndReleases(e);
  }

  _onTouchMove(e) {
    console.log('Touch Move');
    this._determinePressesAndReleases(e);
  }

  _onTouchEnd(e) {
    console.log('Touch End');
    this._determinePressesAndReleases(e);
  } 

  // Render the transparent View tags that represent the area that each button takes up, as well as the presentational JoyPad component the user sees
  // Render the pause modal if the user clicks the pause button
  render() {
    StatusBarIOS.setHidden('true');
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}} onTouchStart={this._onTouchStart.bind(this)} onTouchMove={this._onTouchMove.bind(this)} onTouchEnd={this._onTouchEnd.bind(this)}>
          <View style={styles.DPadArea} onLayout={this._onLayoutDPad.bind(this)}/>
          <View style={styles.ABXYArea} onLayout={this._onLayoutABXY.bind(this)}/>
          <View style={styles.lShoulderArea} onLayout={this._onLayoutLShoulder.bind(this)}/>
          <View style={styles.rShoulderArea} onLayout={this._onLayoutRShoulder.bind(this)}/>
          <View style={styles.selectArea} onLayout={this._onLayoutSelect.bind(this)}/>
          <View style={styles.startArea} onLayout={this._onLayoutStart.bind(this)}/>

          <JoyPad currentButtonPresses={this.state.currentButtonPresses}/>

        </View>

        <TouchableOpacity style={styles.pauseButton} onPress={this._pause.bind(this)}>
          <FontAwesomeIcon name="pause-circle" size={Dimensions.get('window').width* 0.106} allowFontScaling={false} color="#353632"/>
        </TouchableOpacity>

        {this.state.showPauseModal ? <PauseModal _resume={this._resume.bind(this)} _pairController={this._pairController.bind(this)}/> : null}

      </View>
    );
  }
}

// Define the touch areas of each button (these are not the actual views the user sees, but the hit areas: lots of hit slop relative to the size of the rendered button views so there is room for user error)
const styles = StyleSheet.create({
  DPadArea: {
    position: 'absolute',
    top: Dimensions.get('window').width * .15,
    left: 0, 
    width: 0,
    height: 0,
    borderTopWidth: Dimensions.get('window').width * 0.33,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: Dimensions.get('window').width * 0.4,
    borderRightColor: 'transparent',
    borderRightWidth: Dimensions.get('window').width * 0.4,
    borderBottomColor: 'transparent',
    borderBottomWidth: Dimensions.get('window').width * 0.33,
  },
  ABXYArea: {
    position: 'absolute',
    top: Dimensions.get('window').width * .15,
    right: 0, 
    width: 0,
    height: 0,
    borderTopWidth: Dimensions.get('window').width * 0.425,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: Dimensions.get('window').width * 0.4,
    borderRightColor: 'transparent',
    borderRightWidth: Dimensions.get('window').width * 0.4,
    borderBottomColor: 'transparent',
    borderBottomWidth: Dimensions.get('window').width * 0.425,
  },
  lShoulderArea: {
    position: 'absolute',
    top: 0,
    left: 0, 
    width: Dimensions.get('window').height * 0.45,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'transparent'
  },
  rShoulderArea: {
    position: 'absolute',
    top: 0,
    right: 0, 
    width: Dimensions.get('window').height * 0.45,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'transparent'
  },
  selectArea: {
    position: 'absolute',
    bottom: 0,
    left: 0, 
    width: (Dimensions.get('window').width * 0.8 ) / 2,
    height: Dimensions.get('window').width * 0.19,
    backgroundColor: 'transparent'
  },
  startArea: {
    position: 'absolute',
    bottom: 0,
    left: (Dimensions.get('window').width * 0.8 ) / 2, 
    width: (Dimensions.get('window').width * 0.8 ) / 2,
    height: Dimensions.get('window').width * 0.19,
    backgroundColor: 'transparent'
  },
  pauseButton: {
    position: 'absolute',
    bottom: Dimensions.get('window').width * 0.04,
    right: Dimensions.get('window').width * 0.02666,
  },
});

module.exports = JoyPadContainer;

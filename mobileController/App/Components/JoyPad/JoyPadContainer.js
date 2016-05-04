const React = require('react-native');
const Orientation = require('react-native-orientation');
const _ = require('lodash');

const webSocket = require('../../Utils/webSocketMethods');
const utils = require('../../Utils/utils');
const PauseModal = require('./PauseModal');
const JoyPad = require('./JoyPad');
const SelectStart = require('./SelectStart');
const PauseButton = require('./PauseButton');

const {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBarIOS,
  AppStateIOS,
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


// This container component holds JoyPad methods, determines the touch areas of each button, determines which buttons are pressed, and what messages to send to the websocket server
class JoyPadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // tracks if app has been closed; if it it closed and loses connection to the websocket server, then pop back to QRReader
      appState: undefined,
      JoyPadOpen: true,

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

      // the most recent DPad arrow button pressed; used to solve rendering conflicts if user presses multiple DPad buttons
      latestDPadTouch: undefined,

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
      _turnCameraOn = this.props.route._turnCameraOn.bind(this);
      _showDisconnectedModal = this.props.route._showDisconnectedModal.bind(this);

      if(global.JoyPadOpen) {
        _showDisconnectedModal();
        navigator.popToTop();
        Orientation.lockToPortrait();
        _turnCameraOn();
      }
    };
  }

  componentDidMount() {
    console.log('mounted joypad')

    Orientation.lockToLandscapeRight(); // this will lock the view to Landscape
    AppStateIOS.addEventListener('change', this._handleAppStateChange.bind(this));  // tracks if app has been closed; if it it closed and loses connection to the websocket server, then pop back to QRReader
  }

  componentWillUnmount() {
    console.log('unmount joypad');
    AppStateIOS.removeEventListener('change', this._handleAppStateChange.bind(this));
    global.JoyPadOpen = false;
    global.webSocketAlreadyConnected = false;
  }

  _handleAppStateChange(currentAppState) {
    this.setState({ appState : currentAppState });
    if(ws.readyState !== 1) {
      global.onclose();
    }
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
    _turnCameraOn = this.props.route._turnCameraOn.bind(this);
    webSocket.RePairController(function() {
      navigator.popToTop();
      Orientation.lockToPortrait();
      _turnCameraOn();
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
      return {
        x: touch.pageX,
        y: touch.pageY,
        identifier: touch.identifier
      };
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
    // For the DPad buttons, set the button to be the touch identifier # so we know what order the DPad buttons were pressed in; when we render the DPad view, 
    // only one button can be shown as pressed at one time so we need to keep track of which is the most recent one pressed, next most recent one pressed when the most recent one is released, etc.
    _.each(touchCoordinates, function(touchCoordinate) {
      // console.log(touchCoordinate.x);
      self._pressingA([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {a: true})}) : null;
      self._pressingB([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {b: true})}) : null;
      self._pressingX([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {x: true})}) : null;
      self._pressingY([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {y: true})}) : null;
      self._pressingRight([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {right: touchCoordinate.identifier})}) : null;
      self._pressingDown([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {down: touchCoordinate.identifier})}) : null;
      self._pressingUp([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {up: touchCoordinate.identifier})}) : null;
      self._pressingLeft([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {left: touchCoordinate.identifier})}) : null;
      self._pressingLShoulder([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {lShoulder: true})}) : null;
      self._pressingRShoulder([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {rShoulder: true})}) : null;
      self._pressingSelect([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {select: true})}) : null;
      self._pressingStart([touchCoordinate.x, touchCoordinate.y]) ? self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {start: true})}) : null;
    });
    console.log('state', self.state.currentButtonPresses);

    // Figure out which DPad button was the most recent one hit so that if the user hits two DPad buttons at the same time, there won't be strange rendering
    var DPadTouches = {
      'up' : self.state.currentButtonPresses.up,
      'down' : self.state.currentButtonPresses.down,
      'left' : self.state.currentButtonPresses.left,
      'right' : self.state.currentButtonPresses.right,
    }
    var largestTouchIdentifier = Object.keys(DPadTouches).reduce(function(m, k){ return DPadTouches[k] > m ? DPadTouches[k] : m }, -Infinity);
    var latestDPadTouch = _.findKey(DPadTouches, (DPadTouch) => {
      return DPadTouch === largestTouchIdentifier;
    });
    this.setState({latestDPadTouch: latestDPadTouch});

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

          <JoyPad currentButtonPresses={this.state.currentButtonPresses} latestDPadTouch={this.state.latestDPadTouch}/>
          <PauseButton _pause={this._pause.bind(this)}/>

        </View>

        {this.state.showPauseModal ? <PauseModal _resume={this._resume.bind(this)} _pairController={this._pairController.bind(this)}/> : null}

      </View>
    );
  }
}

// Define the touch areas of each button (these are not the actual views the user sees, but the hit areas: lots of hit slop relative to the size of the rendered button views so there is room for user error)
const styles = StyleSheet.create({
  DPadArea: {
    position: 'absolute',
    top: windowWidth * .15,
    left: 0, 
    width: 0,
    height: 0,
    borderTopWidth: windowWidth * 0.33,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: windowWidth * 0.4,
    borderRightColor: 'transparent',
    borderRightWidth: windowWidth * 0.4,
    borderBottomColor: 'transparent',
    borderBottomWidth: windowWidth * 0.33,
  },
  ABXYArea: {
    position: 'absolute',
    top: windowWidth * .15,
    right: 0, 
    width: 0,
    height: 0,
    borderTopWidth: windowWidth * 0.425,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderLeftWidth: windowWidth * 0.4,
    borderRightColor: 'transparent',
    borderRightWidth: windowWidth * 0.4,
    borderBottomColor: 'transparent',
    borderBottomWidth: windowWidth * 0.425,
  },
  lShoulderArea: {
    position: 'absolute',
    top: 0,
    left: 0, 
    width: windowHeight * 0.45,
    height: windowWidth * 0.15,
    backgroundColor: 'transparent'
  },
  rShoulderArea: {
    position: 'absolute',
    top: 0,
    right: 0, 
    width: windowHeight * 0.45,
    height: windowWidth * 0.15,
    backgroundColor: 'transparent'
  },
  selectArea: {
    position: 'absolute',
    bottom: 0,
    left: 0, 
    width: (windowWidth * 0.8 ) / 2,
    height: windowWidth * 0.19,
    backgroundColor: 'transparent'
  },
  startArea: {
    position: 'absolute',
    bottom: 0,
    left: (windowWidth * 0.8 ) / 2, 
    width: (windowWidth * 0.8 ) / 2,
    height: windowWidth * 0.19,
    backgroundColor: 'transparent'
  },
});

module.exports = JoyPadContainer;

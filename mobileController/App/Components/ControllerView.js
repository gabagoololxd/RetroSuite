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
      showPauseModal: false,  // set to true when game is paused
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
      layout: {
        DPad: undefined,
        ABXY: undefined,
        lShoulder: undefined,
        rShoulder: undefined,
        start: undefined,
        select: undefined
      }
    };
    // this._pointInTriangle = this._pointInTriangle.bind(this);
    // this._pressingA = this._pressingA.bind(this);
    // this._pressingB = this._pressingB.bind(this);
    // this._pressingX = this._pressingX.bind(this);
    // this._pressingY = this._pressingY.bind(this);
    // this._pressingLShoulder = this._pressingLShoulder.bind(this);
    // this._pressingRShoulder = this._pressingRShoulder.bind(this);
    // this._pressingUp = this._pressingUp.bind(this);
    // this._pressingDown = this._pressingDown.bind(this);
    // this._pressingLeft = this._pressingLeft.bind(this);
    // this._pressingRight = this._pressingRight.bind(this);
    // this._pressingStart = this._pressingStart.bind(this);
    // this._pressingSelect = this._pressingSelect.bind(this);
    // this._determinePressesAndReleases = this._determinePressesAndReleases.bind(this);

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
    Orientation.lockToLandscapeRight(); // this will lock the view to Landscape
  }

  // Pause button and button options while game is paused:
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

  // Touch helpers

  _pointInTriangle(P, A, B, C) {
    // Compute vectors        
    function vec(from, to) {  return [to[0] - from[0], to[1] - from[1]];  }
    var v0 = vec(A, C);
    var v1 = vec(A, B);
    var v2 = vec(A, P);
    // Compute dot products
    function dot(u, v) {  return u[0] * v[0] + u[1] * v[1];  }
    var dot00 = dot(v0, v0);
    var dot01 = dot(v0, v1);
    var dot02 = dot(v0, v2);
    var dot11 = dot(v1, v1);
    var dot12 = dot(v1, v2);
    // Compute barycentric coordinates
    var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
    var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
    var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
  }

  _pointInRectangle (P, A, D) { //P is the point, A is top left corner of rectangle, D is bottom right corner of rectangle
      x1 = Math.min(A[0], D[0]);
      x2 = Math.max(A[0], D[0]);
      y1 = Math.min(A[1], D[1]);
      y2 = Math.max(A[1], D[1]);
      if ((x1 <= P[0]) && ( P[0]<= x2) && (y1 <= P[1]) && (P[1] <= y2)) {
        return true;
      } else {
        return false;
      };
  };

  _pressingA(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width , this.state.layout.ABXY.y + this.state.layout.ABXY.width]
    );
  }

  _pressingB(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y + this.state.layout.ABXY.height], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width , this.state.layout.ABXY.y + this.state.layout.ABXY.width]
    );
  }

  _pressingX(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width, this.state.layout.ABXY.y], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2 , this.state.layout.ABXY.y/2 + this.state.layout.ABXY.width/2]
    );
  }

  _pressingY(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y + this.state.layout.ABXY.height], 
      [this.state.layout.ABXY.x + this.state.layout.ABXY.width/2, this.state.layout.ABXY.y + this.state.layout.ABXY.height/2], 
      [this.state.layout.ABXY.x, this.state.layout.ABXY.y]
    );
  }

  _pressingRight(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x + this.state.layout.DPad.width, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width , this.state.layout.DPad.y + this.state.layout.DPad.width]
    );
  }

  _pressingDown(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y + this.state.layout.DPad.height], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width , this.state.layout.DPad.y + this.state.layout.DPad.width]
    );
  }

  _pressingUp(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width, this.state.layout.DPad.y], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2 , this.state.layout.DPad.y/2 + this.state.layout.DPad.width/2]
    );
  }

  _pressingLeft(coordinate) {
    return this._pointInTriangle(coordinate, 
      [this.state.layout.DPad.x, this.state.layout.DPad.y + this.state.layout.DPad.height], 
      [this.state.layout.DPad.x + this.state.layout.DPad.width/2, this.state.layout.DPad.y + this.state.layout.DPad.height/2], 
      [this.state.layout.DPad.x, this.state.layout.DPad.y]
    );
  }

  _pressingLShoulder(coordinate) {
    return this._pointInRectangle(coordinate, 
      [this.state.layout.lShoulder.x, this.state.layout.lShoulder.y],
      [this.state.layout.lShoulder.x + this.state.layout.lShoulder.width, this.state.layout.lShoulder.y + this.state.layout.lShoulder.height]
    );
  }

  _pressingRShoulder(coordinate) {
    return this._pointInRectangle(coordinate, 
      [this.state.layout.rShoulder.x, this.state.layout.rShoulder.y],
      [this.state.layout.rShoulder.x + this.state.layout.rShoulder.width, this.state.layout.rShoulder.y + this.state.layout.rShoulder.height]
    );
  }

  _pressingSelect(coordinate) {
    return this._pointInRectangle(coordinate, 
      [this.state.layout.select.x, this.state.layout.select.y],
      [this.state.layout.select.x + this.state.layout.select.width, this.state.layout.select.y + this.state.layout.select.height]
    );
  }

  _pressingStart(coordinate) {
    return this._pointInRectangle(coordinate, 
      [this.state.layout.start.x, this.state.layout.start.y],
      [this.state.layout.start.x + this.state.layout.start.width, this.state.layout.start.y + this.state.layout.start.height]
    );
  }

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

  _determinePressesAndReleases(e) {
    var coordinates = _.map(e.nativeEvent.touches, function(touch) {
      return [touch.pageX, touch.pageY];
    });
    var self = this;
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

    _.each(coordinates, function(touch) {
      if(self._pressingA(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {a: true})})
      } 
      if(self._pressingB(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {b: true})})
      } 
      if(self._pressingX(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {x: true})})
      } 
      if(self._pressingY(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {y: true})})
      } 
      if(self._pressingRight(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {right: true})})
      } 
      if(self._pressingDown(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {down: true})})
      } 
      if(self._pressingUp(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {up: true})})
      } 
      if(self._pressingLeft(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {left: true})})
      } 
      if(self._pressingLShoulder(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {lShoulder: true})})
      } 
      if(self._pressingRShoulder(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {rShoulder: true})})
      } 
      if(self._pressingSelect(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {select: true})})
      } 
      if(self._pressingStart(touch)) {
        self.setState({currentButtonPresses: _.extend(self.state.currentButtonPresses, {start: true})})
      } 
    });

    console.log('state', self.state.currentButtonPresses);

    this.state.currentButtonPresses.a !== this.state.previousButtonPresses.a ? (this.state.currentButtonPresses.a ? utils.Press('a') : utils.Release('a')) : null;
    this.state.currentButtonPresses.b !== this.state.previousButtonPresses.b ? (this.state.currentButtonPresses.b ? utils.Press('b') : utils.Release('b')) : null;
    this.state.currentButtonPresses.x !== this.state.previousButtonPresses.x ? (this.state.currentButtonPresses.x ? utils.Press('x') : utils.Release('x')) : null;
    this.state.currentButtonPresses.y !== this.state.previousButtonPresses.y ? (this.state.currentButtonPresses.y ? utils.Press('y') : utils.Release('y')) : null;
    this.state.currentButtonPresses.up !== this.state.previousButtonPresses.up ? (this.state.currentButtonPresses.up ? utils.Press('up') : utils.Release('up')) : null;
    this.state.currentButtonPresses.down !== this.state.previousButtonPresses.down ? (this.state.currentButtonPresses.down ? utils.Press('down') : utils.Release('down')) : null;
    this.state.currentButtonPresses.left !== this.state.previousButtonPresses.left ? (this.state.currentButtonPresses.left ? utils.Press('left') : utils.Release('left')) : null;
    this.state.currentButtonPresses.right !== this.state.previousButtonPresses.right ? (this.state.currentButtonPresses.right ? utils.Press('right') : utils.Release('right')) : null;
    this.state.currentButtonPresses.lShoulder !== this.state.previousButtonPresses.lShoulder ? (this.state.currentButtonPresses.lShoulder ? utils.Press('l-shoulder') : utils.Release('l-shoulder')) : null;
    this.state.currentButtonPresses.rShoulder !== this.state.previousButtonPresses.rShoulder ? (this.state.currentButtonPresses.rShoulder ? utils.Press('r-shoulder') : utils.Release('r-shoulder')) : null;
    this.state.currentButtonPresses.select !== this.state.previousButtonPresses.select ? (this.state.currentButtonPresses.select ? utils.Press('select') : utils.Release('select')) : null;
    this.state.currentButtonPresses.start !== this.state.previousButtonPresses.start ? (this.state.currentButtonPresses.start ? utils.Press('start') : utils.Release('start')) : null;
  }

  // Touch events
  _onTouchStart(e) {
    console.log('touch Start');
    this._determinePressesAndReleases(e);
  }

  _onTouchMove(e) {
    console.log('touch Move');
    this._determinePressesAndReleases(e);
  }

  _onTouchEnd(e) {
    console.log('touch End');
    this._determinePressesAndReleases(e);
  } 

  render() {
    StatusBarIOS.setHidden('true');
    return (
      <View style={styles.imageContainer}>
        <Image source={require('./Assets/snescontrollercroppedlabels.jpg')} style={styles.image}>
          <View style={{flex: 1}} onTouchStart={this._onTouchStart.bind(this)} onTouchMove={this._onTouchMove.bind(this)} onTouchEnd={this._onTouchEnd.bind(this)}>
            <View style={styles.DPad} onLayout={this._onLayoutDPad.bind(this)}/>
            <View style={styles.ABXY} onLayout={this._onLayoutABXY.bind(this)}/>
            <View style={styles.lShoulder} onLayout={this._onLayoutLShoulder.bind(this)}/>
            <View style={styles.rShoulder} onLayout={this._onLayoutRShoulder.bind(this)}/>
            <View style={styles.select} onLayout={this._onLayoutSelect.bind(this)}/>
            <View style={styles.start} onLayout={this._onLayoutStart.bind(this)}/>
          </View>
        </Image>

        <TouchableOpacity style={styles.pauseButton} onPress={this._pause.bind(this)}>
          <FontAwesomeIcon name="pause-circle" size={50} allowFontScaling={false} color="#6b676e"/>
        </TouchableOpacity>

        {this.state.showPauseModal ? <PauseModal _resume={this._resume.bind(this)} _pairController={this._pairController.bind(this)}/> : null}

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
  DPad: {
    position: 'absolute',
    top: Dimensions.get('window').width * .15,
    left: 0, 
    width: 0,
    height: 0,
    borderTopWidth: Dimensions.get('window').width * 0.33,
    borderTopColor: 'blue',
    borderLeftColor: 'red',
    borderLeftWidth: Dimensions.get('window').width * 0.4,
    borderRightColor: 'green',
    borderRightWidth: Dimensions.get('window').width * 0.4,
    borderBottomColor: 'yellow',
    borderBottomWidth: Dimensions.get('window').width * 0.33,
  },
  ABXY: {
    position: 'absolute',
    top: Dimensions.get('window').width * .15,
    right: 0, 
    width: 0,
    height: 0,
    borderTopWidth: Dimensions.get('window').width * 0.425,
    borderTopColor: 'blue',
    borderLeftColor: 'red',
    borderLeftWidth: Dimensions.get('window').width * 0.4,
    borderRightColor: 'green',
    borderRightWidth: Dimensions.get('window').width * 0.4,
    borderBottomColor: 'yellow',
    borderBottomWidth: Dimensions.get('window').width * 0.425,
  },
  lShoulder: {
    position: 'absolute',
    top: 0,
    left: 0, 
    width: Dimensions.get('window').height * 0.45,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'aqua'
  },
  rShoulder: {
    position: 'absolute',
    top: 0,
    right: 0, 
    width: Dimensions.get('window').height * 0.45,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'aqua'
  },
  select: {
    position: 'absolute',
    bottom: 0,
    left: 55, 
    width: (Dimensions.get('window').width * 0.8 - 55) / 2,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'green'
  },
  start: {
    position: 'absolute',
    bottom: 0,
    left: 55 + (Dimensions.get('window').width * 0.8 - 55) / 2, 
    width: (Dimensions.get('window').width * 0.8 - 55) / 2,
    height: Dimensions.get('window').width * 0.15,
    backgroundColor: 'orange'
  },
  pauseButton: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
});

module.exports = ControllerView;

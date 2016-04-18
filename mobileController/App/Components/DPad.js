var React = require('react-native');
var _ = require('lodash');

var {
  Dimensions,
  StyleSheet,
  View,
  PanResponder,
} = React;

class DPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used to control logic in the D-Pad
      dPadButton: undefined, //currently pressed D-pad button
      dPadStartX: undefined,
      dPadStartY: undefined,
      dPadTouchesIdentifier: undefined, //identifier of the D-Pad touch within the evt.nativeEvent.touches array
    };
  }

  componentWillMount() {
    const upXRelativeCoordinate = this.props.radius;
    const upYRelativeCoordinate = 0;

    const rightXRelativeCoordinate = this.props.radius * 2;
    const rightYRelativeCoordinate = this.props.radius;

    const downXRelativeCoordinate = this.props.radius;
    const downYRelativeCoordinate = this.props.radius * 2;

    const leftXRelativeCoordinate = 0;
    const leftYRelativeCoordinate = this.props.radius;

    //The following code is used to make the D-Pad into a joystick so the user can roll their thumb between buttons and trigger a response
    //instead of having to lift a finger and tap
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started; player's finger has touched the D-Pad area
        var x2 = evt.nativeEvent.locationX;
        var y2 = evt.nativeEvent.locationY;
        this.setState({
          dPadStartX: x2,
          dPadStartY: y2,
        });

        var distanceToUp = Math.sqrt( (upXRelativeCoordinate-x2)*(upXRelativeCoordinate-x2) + (upYRelativeCoordinate-y2)*(upYRelativeCoordinate-y2) );
        var distanceToRight = Math.sqrt( (rightXRelativeCoordinate-x2)*(rightXRelativeCoordinate-x2) + (rightYRelativeCoordinate-y2)*(rightYRelativeCoordinate-y2) );
        var distanceToDown = Math.sqrt( (downXRelativeCoordinate-x2)*(downXRelativeCoordinate-x2) + (downYRelativeCoordinate-y2)*(downYRelativeCoordinate-y2) );
        var distanceToLeft = Math.sqrt( (leftXRelativeCoordinate-x2)*(leftXRelativeCoordinate-x2) + (leftYRelativeCoordinate-y2)*(leftYRelativeCoordinate-y2) );

        var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

        if(closest===distanceToUp && this.state.dPadButton!=='up') {
          this._upArrowPressIn();
        } else if (closest===distanceToRight && this.state.dPadButton!=='right') {
          this._rightArrowPressIn();
        } else if (closest===distanceToDown && this.state.dPadButton!=='down') {
          this._downArrowPressIn();
        } else if (closest===distanceToLeft && this.state.dPadButton!=='left') {
          this._leftArrowPressIn();
        }

      },
      onPanResponderMove: (evt, gestureState) => {
        // The player has moved their finger after touching the D-Pad area
        // Find the identifier of the touch that corresponds to the D-Pad: this is done because if another button is clicked (ex. A/B/X/Y with the right thumb) 
        //or another part of the screen is toucher and the user moves their right finger, it will throw off the D-Pad
        var initialX = this.state.dPadStartX;
        var initialY = this.state.dPadStartY;
        var mapped = evt.nativeEvent.touches.map(function(touch){
          var distance=Math.sqrt( (initialX-touch.pageX)*(initialX-touch.pageX) + (initialY-touch.pageY)*(initialY-touch.pageY) );
          return {'distance':distance, 'identifier': touch.identifier};
        });
        var closest = _.sortBy(mapped, 'distance');
        var identifier = closest[0]['identifier'];
        this.setState({dPadTouchesIdentifier:identifier});

        // Register dpad controls based on filtered evt.nativeEvent.touches where identifier is the state.
        var dPadTouch = evt.nativeEvent.touches.filter(function(touch){
          return touch.identifier = identifier;
        })
        var x2 = dPadTouch[0].locationX;
        var y2 = dPadTouch[0].locationY;

        var distanceToUp = Math.sqrt( (upXRelativeCoordinate-x2)*(upXRelativeCoordinate-x2) + (upYRelativeCoordinate-y2)*(upYRelativeCoordinate-y2) );
        var distanceToRight = Math.sqrt( (rightXRelativeCoordinate-x2)*(rightXRelativeCoordinate-x2) + (rightYRelativeCoordinate-y2)*(rightYRelativeCoordinate-y2) );
        var distanceToDown = Math.sqrt( (downXRelativeCoordinate-x2)*(downXRelativeCoordinate-x2) + (downYRelativeCoordinate-y2)*(downYRelativeCoordinate-y2) );
        var distanceToLeft = Math.sqrt( (leftXRelativeCoordinate-x2)*(leftXRelativeCoordinate-x2) + (leftYRelativeCoordinate-y2)*(leftYRelativeCoordinate-y2) );

        var closest = Math.min(distanceToUp, distanceToRight, distanceToDown, distanceToLeft);

        if(closest===distanceToUp && this.state.dPadButton!=='up') {
          this._upArrowPressIn();
        } else if (closest===distanceToRight && this.state.dPadButton!=='right') {
          this._rightArrowPressIn();
        } else if (closest===distanceToDown && this.state.dPadButton!=='down') {
          this._downArrowPressIn();
        } else if (closest===distanceToLeft && this.state.dPadButton!=='left') {
          this._leftArrowPressIn();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches within the responder
        this._upArrowPressOut();
        this._rightArrowPressOut();
        this._downArrowPressOut();
        this._leftArrowPressOut();
      },
    });
  }

  _upArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='up') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "up"});
    this.props.onUpArrowPress();
  }
  _upArrowPressOut() {
    this.setState({dPadButton: undefined});
    this.props.onUpArrowRelease();
  }

  _downArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='down') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "down"});
    this.props.onDownArrowPress();
  }
  _downArrowPressOut() {
    this.setState({dPadButton: undefined});
    this.props.onDownArrowRelease();
  }

  _rightArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='right') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='left') {
        this._leftArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      }
    }
    this.setState({dPadButton: "right"});
    this.props.onRightArrowPress();
  }
  _rightArrowPressOut() {
    this.setState({dPadButton: undefined});
    this.props.onRightArrowRelease();
  }

  _leftArrowPressIn() {
    if(this.state.dPadButton!==undefined && this.state.dPadButton!=='left') { //there is already another D-Pad button pressed, which means that we are changing from one D-Pad button to another
      if(this.state.dPadButton==='down') {
        this._downArrowPressOut();
      } else if(this.state.dPadButton==='up') {
        this._upArrowPressOut();
      } else if(this.state.dPadButton==='right') {
        this._rightArrowPressOut();
      }
    }
    this.setState({dPadButton: "left"});
    this.props.onLeftArrowPress();
  }
  _leftArrowPressOut() {
    this.setState({dPadButton: undefined});
    this.props.onLeftArrowRelease();
  }

  render() {
    return (
      <View {...this._panResponder.panHandlers} style={[this.props.style, {
        width: this.props.radius * 2,
        height: this.props.radius * 2,
        borderRadius: this.props.radius,
        position: 'absolute',
        top: this.props.absolutePositionOfDPadCenter.x - this.props.radius,
        left: this.props.absolutePositionOfDPadCenter.y - this.props.radius,
      }]}/>
    );
  }
}

module.exports = DPad;

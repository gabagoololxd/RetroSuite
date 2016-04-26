var React = require('react-native');

var DPad = require('./DPad');
var ABXY = require('./ABXY');
var LRShoulders = require('./LRShoulders');
var SelectStart = require('./SelectStart');

var {
  View,
} = React;  

// This presentational component renders the views of each button
class JoyPad extends React.Component { 
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#a69f9a'}} >   
        <LRShoulders currentButtonPresses={this.props.currentButtonPresses}/>
        <ABXY currentButtonPresses={this.props.currentButtonPresses}/>
        <DPad currentButtonPresses={this.props.currentButtonPresses}/>
        <SelectStart currentButtonPresses={this.props.currentButtonPresses}/>
      </View>   
    );
  }
}

module.exports = JoyPad;

const React = require('react-native');

const DPad = require('./DPad');
const ABXY = require('./ABXY');
const LRShoulders = require('./LRShoulders');
const SelectStart = require('./SelectStart');

const {
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

const React = require('react-native');
const QRReader = require('./App/Components/QRReader/QRReader');

const {
  AppRegistry,
  Navigator
} = React;

class mobileController extends React.Component {
  render() {
    return (
      <Navigator
        initialRoute={{
          component: QRReader
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        renderScene={(route, navigator) => {
          if (route.component) {
            return React.createElement(route.component, { navigator, route });
          }
        }}
      />
    );
  }
}

AppRegistry.registerComponent('mobileController', () => mobileController);

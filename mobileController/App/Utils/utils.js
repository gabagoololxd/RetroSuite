var utils = {
  PairController(ipAddress, callback) {
    var url = 'ws://' + ipAddress + '/';
    window.ws = new WebSocket(url);

    ws.onopen = function(){
      // connection opened
      console.log('opennnnnnnn');
      ws.send('pair');
      callback();
    }

    ws.onmessage = (e) => {
      // a message was received
      console.log('message!!!', e.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('errorrrrr', e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log('eeee', e);
      console.log('closesssssssssss', e.code, e.reason);
    };
  },

  Press(button) {
    ws.send('press ' + button);
  },

  Release(button) {
    ws.send('release ' + button);
  },

  Pause(callback) {

  },

  Resume(callback) {

  },

  RePairController(ipAddress, callback) {

  },

};

module.exports = utils;
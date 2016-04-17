var utils = {
  PairController(ipAddress, openControllerViewCallback) {
    var url = 'ws://' + ipAddress + '/';
    global.ws = new WebSocket(url);

    ws.onopen = function(){
      // connection opened
      console.log('ws open');
      // tell the emulator to go to the next screen
      ws.send('pair');
      // mount ControllerView.js, turn off camera
      openControllerViewCallback();
    }

    ws.onmessage = (e) => {
      // a message was received
      console.log('ws message', e.data);
      if(e.data === 'pause') {
        global.pause();
      } else if (e.data === 'resume') {
        global.resume();
      }
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('ws error', e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log('ws close', e.code, e.reason);
      global.onclose();
    };
  },

  Press(button) {
    console.log('press ' + button)
    ws.send('press ' + button);
  },

  Release(button) {
    // console.log('release ' + button)
    ws.send('release ' + button);
  },

  Pause(callback) {
    ws.send('pause');
    callback();
  },

  Resume(callback) {
    ws.send('resume');
    callback();
  },

  RePairController(callback) {
    ws.send('re-pair');
    ws.close();
    callback();
  },

};

module.exports = utils;
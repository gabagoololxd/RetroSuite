var api = {
  PairController(ipAddress) {
    var url = 'http://' + ipAddress + '/pair-controller';
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  Press(ipAddress, button) {
    var url = 'http://' + ipAddress + '/player/press/' + button;
    return fetch(url, {
      method: 'POST',
      body: null
    });
  },

  Release(ipAddress, button) {
    var url = 'http://' + ipAddress + '/player/release/' + button;
    return fetch(url, {
      method: 'POST',
      body: null
    });
  },

  Pause(ipAddress) {
    var url = 'http://' + ipAddress + '/pause';
    return fetch(url, {
      method: 'POST',
      body: null
    });
  },

};

module.exports = api;

var api = {
  PairController(ipAddress, callback) {
    var url = 'http://' + ipAddress + '/pair-controller';
    return fetch(url, {
      method: 'GET',
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

  Pause(ipAddress, callback) {
    var url = 'http://' + ipAddress + '/pause';
    return fetch(url, {
      method: 'POST',
      body: null
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  Resume(ipAddress, callback) {
    var url = 'http://' + ipAddress + '/resume';
    return fetch(url, {
      method: 'POST',
      body: null
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  RePairController(ipAddress, callback) {
    var url = 'http://' + ipAddress + '/re-pair-controller';
    return fetch(url, {
      method: 'POST',
      body: null
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

};

module.exports = api;

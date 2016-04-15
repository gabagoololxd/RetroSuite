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

    var p = Promise.race([
      fetch(url, {method: 'POST', body: null}),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 500)
      })
    ])
    p.then(response => console.log(response))
    p.catch(error => console.log(error))

  },

  Release(ipAddress, button) {
    var url = 'http://' + ipAddress + '/player/release/' + button;

    var p = Promise.race([
      fetch(url, {method: 'POST', body: null}),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 500)
      })
    ])
    p.then(response => console.log(response))
    p.catch(error => console.log(error))

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

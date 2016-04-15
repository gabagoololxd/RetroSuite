var http = require('http');
var port = 1337;
var host = '0.0.0.0';
try {
  if (!router) {
    var router = require('./router.js');
  }
} catch (err) {}

var server = http.createServer(function (req, res) {
  router(req, res);
});

server.listen(port, host);
console.log('Server running at ' + host + ':' + port + '/');

try {
  module.exports = server;
} catch (err) {}

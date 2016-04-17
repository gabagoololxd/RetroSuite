try {
  if (!messageParser) {
    var messageParser = require('./messageParser.js');
  }
} catch (err) {}

window.port = 1337;

var isServer = false;
if (http.Server && http.WebSocketServer) {
  // Listen for HTTP connections.
  var server = new http.Server();
  var wsServer = new http.WebSocketServer(server);
  server.listen(port);
  isServer = true;

  // A list of connected websockets.
  window.connectedSockets = [];

  wsServer.addEventListener('request', function(req) {
    console.log('Client connected');
    var socket = req.accept();
    connectedSockets.push(socket);

    socket.addEventListener('message', function(e) {
      console.log(e.data);
      messageParser(e.data);
    });

    // When a socket is closed, remove it from the list of connected sockets.
    socket.addEventListener('close', function() {
      console.log('Client disconnected');
      for (var i = 0; i < connectedSockets.length; i++) {
        if (connectedSockets[i] == socket) {
          connectedSockets.splice(i, 1);
          break;
        }
      }
    });
    return true;
  });
}

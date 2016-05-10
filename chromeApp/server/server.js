try {
  if (!messageParser) {
    var messageParser = require('./messageParser.js');
  }
} catch (err) {}

window.port = 1337;
window.host = '0.0.0.0';

// See if there is already a server running; if so, disconnect so we can make a new one
chrome.sockets.tcpServer.getSockets(function (sockets){
  sockets.forEach(function(socket){
    chrome.sockets.tcpServer.disconnect(socket.socketId);
  });
})

// Listen for HTTP connections
var server = new http.Server();
server.listen(port, host);
console.log('server listening on ', host + ':' + port);

// A list of connected websockets
window.connectedSockets = [];

// Start websockets server
var wsServer = new http.WebSocketServer(server);
wsServer.addEventListener('request', function(req) {
  console.log('Client connected');
  var socket = req.accept();
  connectedSockets.push(socket);
  console.log('socket', socket)

  // Following code handles edge case where the user scans the qr, but the computer running the chrome app has wifi off
  // When wifi turns on, multiple connections are made because the camera has scanned multiple times, 
  // but there should not be multiple messages telling the user the controller has connected
  var newSocketPeerAddress;
  var existingPeerAddresses = [];
  chrome.sockets.tcp.getSockets(function (sockets) {
    sockets.forEach(function(socket) {
      existingPeerAddresses.push(socket.peerAddress);
    });
    console.log('existing peerAddresses', existingPeerAddresses);
    chrome.sockets.tcp.getInfo(socket.pSocket_.socketId, function (information) {
      console.log('new socket peerAddress', information.peerAddress);
      newSocketPeerAddress = information.peerAddress;

      var newSocketPeerAddressCount = _.filter(existingPeerAddresses, function(address){
        return address === newSocketPeerAddress;
      });


      if(newSocketPeerAddressCount.length > 1) {
        console.log('same controller connected multiple times');
      } else {
        console.log('new controller connected');
        // alert the user that their controller connected
        document.getElementById('controllerConnectedHintBubble').classList.remove('hidden');
        setTimeout(function(){
          $( "#controllerConnectedHintBubble" ).show().fadeOut( "slow", function() {});
        },4000)
      }
    });
  });

  // Listen for button presses and respond accordingly
  socket.addEventListener('message', function(e) {
    console.log(e.data);
    messageParser(e.data);
  });

  // When a socket is closed, remove it from the list of connected sockets.
  socket.addEventListener('close', function() {
    // pause the game for the user and alert them that their controller disconnected
    window.pauseGame();
    document.getElementById('controllerDisconnectedHintBubble').classList.remove('hidden');
    setTimeout(function(){
      $( "#controllerDisconnectedHintBubble" ).show().fadeOut( "slow", function() {});
    },4000)

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

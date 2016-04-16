//main app module
window.app = app = angular.module('app', [
  'app.filters'
])
.config([ //Allows us to use data-ng-src in chrome app
  '$compileProvider',
  function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
  }
]);



// chrome.sockets.tcpServer.create({}, function(createInfo) {
//   listenAndAccept(createInfo.socketId);
// });

// function listenAndAccept(socketId) {
//   chrome.sockets.tcpServer.listen(socketId,
//     '10.0.0.215', 3000, function(resultCode) {
//       onListenCallback(socketId, resultCode)
//   });
// }

// var serverSocketId;
// function onListenCallback(socketId, resultCode) {
//   if (resultCode < 0) {
//     console.log("Error listening:" +
//       chrome.runtime.lastError.message);
//     return;
//   }
//   serverSocketId = socketId;
//   chrome.sockets.tcpServer.onAccept.addListener(onAccept)
//   chrome.sockets.tcpServer.onAcceptError.addListener(onAcceptError)

// }

// console.log('serverSocketId',serverSocketId)

// function ab2str(buf) {
//   return String.fromCharCode.apply(null, new Uint16Array(buf));
// }

// function str2ab(str) {
//   var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i=0, strLen=str.length; i<strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }

// function onAccept(info) {
//   if (info.socketId != serverSocketId)
//     return;
  
//   // A new TCP connection has been established.
//   buf = str2ab("Connected. Bam!!!\n");
//   chrome.sockets.tcp.send(info.clientSocketId, buf,
//     function(resultCode) {
//       console.log('resultCode', resultCode)
//       console.log("Data sent to new TCP client connection.")
//   });
//   // Start receiving data.
//   chrome.sockets.tcp.onReceive.addListener(function(recvInfo) {
//     if (recvInfo.socketId != info.clientSocketId)
//       return;
//     console.log(recvInfo.socketId, 'recvInfo.socketId,')
//     console.log(info.clientSocketId, 'info.clientSocketId')

//     console.log("recvInfo", recvInfo.data);
//     // recvInfo.data is an arrayBuffer.
//   });
//   chrome.sockets.tcp.setPaused(info.clientSocketId, false);
// }

// function onAcceptError(info) {
// 	console.log('info', info);
// }


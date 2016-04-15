var url = require('url');

function router(req, res) {

  console.log('req received');

  var httpVerb = req.method;
  var httpPath = req.url;
  var pathArr = req.url.split('/');

  if ( // app.get('/pair-controller', cb)
    httpVerb === 'GET' &&
    httpPath === '/pair-controller'
  ) {
    if(window.retro && window.retro.classList.contains('hidden')) {
      window.closeQRScreen();
      window.resumeGame();
    } else {
      window.toggleInputSelectionScreen();
    }
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({message: 'mobile controller successfully paired!'}));
  } else if ( // app.post('/pause', cb) 
    httpVerb === 'POST' && 
    pathArr.length === 2 &&
    pathArr[1] === 'pause'
  ) {
    window.pauseGame();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'paused'}));
  } else if ( // app.post('/resume', cb) 
    httpVerb === 'POST' && 
    pathArr.length === 2 &&
    pathArr[1] === 'resume'
  ) {
    window.resumeGame();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'resumed'}));
  } else if ( // app.post('/re-pair-controller', cb) 
    httpVerb === 'POST' && 
    pathArr.length === 2 &&
    pathArr[1] === 're-pair-controller'
  ) {
    window.openQRScreen();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'resumed'}));
  } else if ( // app.post('/player/:action/:button', cb)   like: /player/press/a
    httpVerb === 'POST' &&
    pathArr.length === 4 &&
    pathArr[1] === 'player'
  ) {
    var action;
    if (pathArr[2] === 'press') {
      action = 'keydown';
    } else if (pathArr[2] === 'release') {
      action = 'keyup';
    }
    var button = pathArr[3];
    var asciiNum = getAsciiKey(button);
    var keyBoardEvent = makeEvent(action, asciiNum);
    document.querySelector('body').dispatchEvent(keyBoardEvent);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'player just ' + action + 'ed ' + button}));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end();
  }
};

function getAsciiKey(button) {
  switch (button) {
    case 'a':
      return 61;
    case 'b':
      return 59;
    case 'x':
      return 173;
    case 'y':
      return 108
    case 'start':
      return 226;
    case 'select':
      return 183;
    case 'up':
      return 230;
    case 'down':
      return 233;
    case 'left':
      return 234;
    case 'right':
      return 255;
    case 'l-shoulder':
      return 181;
    case 'r-shoulder':
      return 182;
    default:
      break;
  }
}

try {
  module.exports = router;
} catch (err) {}

// Helper function to create keyboard events:
function makeEvent(type, asciiNum) {

  var evt = new KeyboardEvent(type, {
    'bubbles': true,
    'keyCode': asciiNum,
    'charCode': 0,
    'view': window
  });

  Object.defineProperty(evt, 'keyCode', {value: asciiNum, enumerable: true});
  Object.defineProperty(evt, 'charCode', {value: 0, enumerable: true});
  Object.defineProperty(evt, 'which', {value: asciiNum, enumerable: true});
  Object.defineProperty(evt, 'view', {value: window, enumerable: true});
  return evt;

}

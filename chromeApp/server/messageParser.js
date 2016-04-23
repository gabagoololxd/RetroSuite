function messageParser (message) {
  if (message === 'pair') {
    if(window.retro && window.retro.classList.contains('hidden')) { // qr was scanned from the pause screen
      window.closeQRScreen();
      window.resumeGame();
    } else { // qr was scanned from the input selection screen
      window.toggleInputSelectionScreen();
    }
  } else if (message === 'pause') {
    window.pauseGame();
  } else if (message === 'resume') {
    window.resumeGame();
  } else if (message === 're-pair') {
    window.openQRScreen();
  } else if (message.split(' ')[0] === 'press' || message.split(' ')[0] === 'release') {
    var action;
    if (message.split(' ')[0] === 'press') {
      action = 'keydown';
    } else if (message.split(' ')[0] === 'release') {
      action = 'keyup';
    }
    var button = message.split(' ')[1];
    var asciiNum = getAsciiKey(button);
    var keyBoardEvent = makeEvent(action, asciiNum);
    document.querySelector('body').dispatchEvent(keyBoardEvent);
  }
}

try {
  module.exports = messageParser;
} catch (err) {}


//Helper functions to create keyboard events:
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
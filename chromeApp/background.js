function newWindow() {
  return new Promise(function(resolve, reject) {
    chrome.power.requestKeepAwake('display');
    chrome.app.window.create('index.html', {
      'minWidth': Math.round(window.screen.availWidth*0.5),
      'minHeight': Math.round(window.screen.availHeight*0.5),
      'bounds': {
        'width': Math.round(window.screen.availWidth*0.8),
        'height': Math.round(window.screen.availHeight*0.8),
      }
    }, resolve)
  })
}

function launch(file) {
  return new Promise(function(resolve, reject) {
    file.entry.file(resolve, reject)
  }).then(function(blob) {
    return newWindow().then(function(w) {
      w.contentWindow.filename = blob.name
      w.contentWindow.url = URL.createObjectURL(blob)
    })
  })
}

chrome.app.runtime.onLaunched.addListener(function(launchData) {
  if (launchData.items) {
    launchData.items.forEach(launch)
  } else {
    newWindow();
  }
});
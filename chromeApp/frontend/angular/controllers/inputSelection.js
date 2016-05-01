//inputSelection screen
app.controller('inputSelection', function($scope) {
  $scope.ipAddress = 'filler';
  $scope.ipFound = false;
  $scope.toggleInputSelectionScreen = function() {
    window.retro.start();
    inputSelectionScreen = document.getElementById('inputSelectionScreen');
    inputSelectionScreen.classList.add('hidden');
    document.getElementById('menuHintBubble').classList.remove('hidden');
    setTimeout(function(){
      $( "#menuHintBubble" ).fadeOut( "slow", function() {});
    },4000)
    // $scope.$apply();
  }
  var qrScreen = document.getElementById('qrScreen');
  $scope.openQRScreen = function() {

    chrome.system.network.getNetworkInterfaces(function (ipAddresses) {

      // in case the user switches wifi networks midway through, the QR needs to reupdate
      $scope.ipFound = false;
      $('#qrCode').empty();

      ipAddresses.forEach(function (ipAddress) {
        console.log(ipAddress);
        if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddress.address)) {

          $scope.ipAddress = ip4 = ipAddress.address;
          var toQ = $scope.ipAddress + ':' + window.port;

          if($scope.ipFound === false) {
            $scope.$apply(function() {
              $('#qrInstructions').text('Scan Qr To Pair');
              new QRCode(document.getElementById('qrCode'), toQ);
              
              $('#qrInstructions2').text('Scan Qr To Pair');
              new QRCode(document.getElementById('qrCode2'), toQ);
            });
          }
          $scope.ipFound = true;
        }
      });

    });
    if($scope.ipFound === false) {
      $('#qrInstructions').text('No Wifi Address Found');
      $('#qrInstructions2').text('No Wifi Address Found');
    }
    qrScreen.classList.remove('hidden');
  };
  $scope.closeQRScreen = function() {
    console.log('close click');
    qrScreen.classList.add('hidden');
  };

  window.toggleInputSelectionScreen = $scope.toggleInputSelectionScreen;
  window.openQRScreen = $scope.openQRScreen;

  //Handle Keyboard Icon 
  document.getElementById('keyboardIcon').addEventListener('click', window.toggleInputSelectionScreen);
  document.getElementById('keyboardIcon').addEventListener('mouseover', function() {
    $("#keyboardIcon").css('background-image', 'url(' + './frontend/img/desktopiconhighlight.png' + ')');
  });
  document.getElementById('keyboardIcon').addEventListener('mouseout', function() {
    $("#keyboardIcon").css('background-image', 'url(' + './frontend/img/desktopicondark.png' + ')');
  });

  //Handle Mobile Icon
  document.getElementById('mobileIcon').addEventListener('click', window.openQRScreen);
  document.getElementById('mobileIcon').addEventListener('mouseover', function() {
    $("#mobileIcon").css('background-image', 'url(' + './frontend/img/desktopwithmobileiconhighlight.png' + ')');
  });
  document.getElementById('mobileIcon').addEventListener('mouseout', function() {
    $("#mobileIcon").css('background-image', 'url(' + './frontend/img/desktopwithmobileicondark.png' + ')');
  });


});
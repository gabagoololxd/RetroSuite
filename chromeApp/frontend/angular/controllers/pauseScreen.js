//pause game screen
app.controller('pauseScreen', function($scope) {
  var qrScreen2 = document.getElementById('qrScreen2');
  window.openQRScreen = $scope.openQRScreen = function() {
    chrome.system.network.getNetworkInterfaces(function (ipAddresses) {

      // in case the user switches wifi networks midway through, the QR needs to reupdate
      $scope.ipFound = false;
      $('#qrCode2').empty();

      ipAddresses.forEach(function (ipAddress) {
        console.log(ipAddress);
        if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ipAddress.address)) {

          $scope.ipAddress = ip4 = ipAddress.address;
          var toQ = $scope.ipAddress + ':' + window.port;

          if($scope.ipFound == false) {
            $scope.$apply(function() {
              $('#qrInstructions2').text('Scan Qr To Pair');
              new QRCode(document.getElementById('qrCode2'), toQ);
            });
          }
          $scope.ipFound = true;
        }
      });

    });
    if($scope.ipFound === false) {
      $('#qrInstructions2').text('No Wifi Address Found');
    }
    qrScreen2.classList.remove('hidden');
  };
  window.closeQRScreen = $scope.closeQRScreen = function() {
    console.log('close click');
    qrScreen2.classList.add('hidden');
  };
  $scope.chooseNewGame = function() {
    window.chooseNewGame();
  }
  
  //helper function to make sure the attempted key mapping is not reserved for the mobilecontroller, or a special key that doesn't work as expected with keydown and keyup events (capslock and command)
  var notReserved = function(mapping) {
    if(mapping != 59 && mapping !=61 && mapping !=108 && mapping !=173 && mapping !=181 && mapping !=182 && mapping !=183 && mapping !=226 && mapping !=230 && mapping !=233 && mapping !=234 && mapping !=235 && mapping !=91 && mapping !=93 && mapping !=20) {
      return true;
    } else {
      return false;
    }
  };
  
  var newKeyMappings = {}; //used to store what might become the actual new key mappings
  var oldKeyMappings = {}; //used to store the last state of keys; used when user clicks cancel
  
  //Event listener for setting new key mappings
  document.querySelector('body').addEventListener('keydown', function (e) {
    // console.log('keycode: ', e.keyCode);
    // console.log('code: ', e.code);

    //only do the following if the emulator has started
    if ($('#retro').length < 1){
      return;
    }
    if(retro.classList.contains('hidden')) {
      e.preventDefault();
      try {
        //if the user is not trying to map to a key reserved to the mobilecontroller, then add in new key to the form input
        if(notReserved(e.keyCode)) {
          document.getElementById(document.activeElement.id).value = window.keyCodes[e.keyCode];
        }
      }
      catch(err) {
        console.log('error', err); //not focused on a form input tag
      }
    }
  });

  $scope.getValue = function(button, mappingsList) {
    mappingsList = mappingsList || systemSettings.keys;
     switch (button) {
       case 'aButton':
         for(var key in mappingsList) {
          // console.log('key', key)
           if(mappingsList[key]=="1" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'bButton':
         for(var key in mappingsList) {
           if(mappingsList[key]=="0" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'xButton':
         for(var key in mappingsList) {
           if(mappingsList[key]=="3" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'yButton':
         for(var key in mappingsList) {
           if(mappingsList[key]=="2" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'startButton':
         for(var key in mappingsList) {
           if(mappingsList[key]=="9" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'selectButton':
         for(var key in mappingsList) {
           if(mappingsList[key]=="8" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'upArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]=="12" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'downArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]=="13" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'leftArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]=="14" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rightArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]=="15" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'lShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]=="4" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]=="5" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       default:
         break;
     }
   } 

  $scope.disabled = true;
  $scope.validationError = false;
  $scope.editHint = false;

  window.edittingKeyMappings = false;

  $scope.editKeyMappings = function() {
    window.edittingKeyMappings = true; //disallow clicking out of the menu if key mappings is in progress
    $scope.editHint = true; //show the instructional text
    $scope.disabled = false; //allow user to edit key mappings by clicking into the input

    //take current key mappings and save them in oldKeyMappings
    oldKeyMappings = {}; 
    for(keyMapping in systemSettings.keys) {
      oldKeyMappings[keyMapping] = systemSettings.keys[keyMapping];
    };
  };

  $scope.submitNewKeyMappings = function() {

    window.edittingKeyMappings = false;
    document.getElementById('resumeError').classList.add('hidden');
    systemSettings.keys = {}; //clear out all current key mappings
    newKeyMappings = {}; //clear out all current key mappings

    var keyCodesInvert = _.invert(window.keyCodes);
    var mappedKeys = [];
    
    //helper function:
    function containsDuplicates(arr) {
      var index = {}, i, str;
      for(i = 0; i < arr.length; i++) {
        str = JSON.stringify(arr[i]);
        if (index.hasOwnProperty(str)) {
          return true;
        } else {
          index[str] = true;
        }
      }
      return false;
    }
    
    $('#keyMappingsForm').find("input").each(function(){
      var id = $(this).attr('id');
      mappedKeys.push(document.getElementById(id).value)
      var keyCode = keyCodesInvert[document.getElementById(id).value];
      newKeyMappings[keyCode] =  window.buttonNumbers[id];   
    });
    
    if(containsDuplicates(mappedKeys)) {
      $scope.validationError = true;
      // display the attempted key mappings
      var counter = 0;
      $('#keyMappingsForm').find("input").each(function(){
        var id = $(this).attr('id');
        document.getElementById(id).value = mappedKeys[counter];
        counter++;
      });

      //set key mappings to what we had before since the user's mappings are invalid
      systemSettings.keys = oldKeyMappings;
    } else {
      $scope.validationError = false;
      //add in the keys that the mobile controller needs
      _.extend(newKeyMappings, window.mobileControllerKeys);

      //submit the new mappings
      systemSettings.keys = newKeyMappings;
      chrome.storage.sync.set({"myKeyMappings": newKeyMappings});

      //reset the cycle
      newKeyMappings = {};
      $scope.disabled = true;
      $scope.editHint = false;
    }


  };

  $scope.cancelSubmitNewKeyMappings = function() {
    window.edittingKeyMappings = false;
    document.getElementById('resumeError').classList.add('hidden');
    $scope.validationError = false;
    //display the old key mappings
    $('#keyMappingsForm').find("input").each(function(){
      var id = $(this).attr('id');
      var oldValueText = $scope.getValue(id, oldKeyMappings);
      document.getElementById(id).value = oldValueText;
    });

    //reset the cycle
    $scope.disabled = true;
    $scope.editHint = false;

  }

});
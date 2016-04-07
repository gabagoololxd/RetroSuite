//pause game screen
app.controller('pauseScreen', function($scope) {
  $scope.chooseNewGame = function () {
    window.chooseNewGame();
  }
  
  //helper function to make sure the attempted key mapping is not reserved
  var notReserved = function(mapping) {
    if(mapping !== "59" && mapping !=="61" && mapping !=="108" && mapping !=="173" && mapping !=="181" && mapping !=="182" && mapping !=="183" && mapping !=="226" && mapping !=="230" && mapping !=="233" && mapping !=="234" && mapping !=="235") {
      return true;
    } else {
      return false;
    }
  };
  
  var newKeyMappings = {}; //used to store what might become the actual new key mappings
  var oldKeyMappings = {}; //used as a cache to store the last state of keys; used when user clicks cancel
  
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
        //if the user is not trying to map to a key reserved to the mobilecontroller, then map in new keys
        if(notReserved(e.keyCode)) {
          document.getElementById(document.activeElement.id).value = window.keyCodes[e.keyCode];
          switch (document.activeElement.id) {
            case 'aButton':
              newKeyMappings[e.keyCode] = '1';
              break;
            case 'bButton':
              newKeyMappings[e.keyCode] = '0';
              break;
            case 'xButton':
              newKeyMappings[e.keyCode] = '3';
              break;
            case 'yButton':
              newKeyMappings[e.keyCode] = '2';
              break;
            case 'startButton':
              newKeyMappings[e.keyCode] = '9';
              break;
            case 'selectButton':
              newKeyMappings[e.keyCode] = '8';
              break;
            case 'upArrow':
              newKeyMappings[e.keyCode] = '12';
              break;
            case 'downArrow':
              newKeyMappings[e.keyCode] = '13';
              break;
            case 'leftArrow':
              newKeyMappings[e.keyCode] = '14';
              break;
            case 'rightArrow':
              newKeyMappings[e.keyCode] = '15';
              break;
            case 'lShoulder':
              newKeyMappings[e.keyCode] = '4';
              break;
            case 'rShoulder':
              newKeyMappings[e.keyCode] = '5';
              break;
            default:
              break;
          }
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
           if(mappingsList[key]==="1" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'bButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="0" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'xButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="3" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'yButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="2" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'startButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="9" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'selectButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="8" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'upArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="12" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'downArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="13" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'leftArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="14" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rightArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="15" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'lShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]==="4" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]==="5" && notReserved(key)) {
             return window.keyCodes[key];
           }
         }
         break;
       default:
         break;
     }
   } 

  $scope.disabled = true;

  $scope.editKeyMappings = function() {
    $scope.disabled = false; //allow user to edit key mappings by clicking into the input

    //take current key mappings and save them in oldKeyMappings
    oldKeyMappings = {}; 
    for(keyMapping in systemSettings.keys) {
      oldKeyMappings[keyMapping] = systemSettings.keys[keyMapping];
    };
    console.log('oldKeyMappings',oldKeyMappings);
  };

  $scope.submitNewKeyMappings = function() {
    systemSettings.keys = {}; //clear out all current key mappings

    //if newKeyMappings has an undefined, then replace with what was in old key mappings TODOOOOO
    console.log('old:', oldKeyMappings);
    console.log('new:', newKeyMappings);

    var keysToMap = [];

    //delete the mobileControllerMappings so we can compare more easily; will add back later
    for(var mapping in oldKeyMappings) {
      if(mobileControllerKeys[mapping]) {
        delete oldKeyMappings[mapping];
      } else {
        keysToMap.push(oldKeyMappings[mapping]);
      }
    }

    function findKey(obj, value) {
      var key;
      _.each(obj, function (v, k) {
        if (v === value) {
          key = k;
        }
      });
      return key;
    }

    _.each(keysToMap, function(button) {
      if(_.contains(_.values(newKeyMappings), button)===false) {
        console.log('nahht there', button)
        var keyboardKey = findKey(oldKeyMappings, button);
        console.log(keyboardKey, "keyboardKey");
        newKeyMappings[keyboardKey] = button;
      }
    });


    //add in the keys that the mobile controller needs
    _.extend(newKeyMappings, window.mobileControllerKeys);

    //submit the new mappings
    systemSettings.keys = newKeyMappings;

    //reset the cycle
    newKeyMappings = {};
    $scope.disabled = true;
  };

  $scope.cancelSubmitNewKeyMappings = function() {
    //display the old key mappings
    $('#keyMappingsForm').find("input").each(function(){
      var id = $(this).attr('id');
      var oldValueText = $scope.getValue(id, oldKeyMappings);
      document.getElementById(id).value = oldValueText;
    });

    //reset the cycle
    $scope.disabled = true;
  }

});
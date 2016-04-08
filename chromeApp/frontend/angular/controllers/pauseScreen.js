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
  $scope.validationError = false;


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
    console.log('before: newKeyMappings',newKeyMappings);

    systemSettings.keys = {}; //clear out all current key mappings
    newKeyMappings = {}; //clear out all current key mappings

    var keyCodesInvert = _.invert(window.keyCodes);
    var mappedKeys = [];
    

    //helper function:
    function containsDuplicates(arr) {
      var index = {}, i, str;

      for(i = 0; i < arr.length; i++) {
        // you could use arr[i].toString() here, but JSON.stringify()
        // is a lot safer because it cannot create ambiguous output.
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
      // console.log('id', id);
      mappedKeys.push(document.getElementById(id).value)
      var keyCode = keyCodesInvert[document.getElementById(id).value];
      // console.log('keyCode', keyCode);
      newKeyMappings[keyCode] =  window.buttonNumbers[id];   
    });
    
    console.log('after: newKeyMappings',newKeyMappings);

    if(containsDuplicates(mappedKeys)) {
      console.log('dupessssssss for dayz');
      $scope.validationError = true;
      // display the attempted key mappings
      var counter = 0;
      $('#keyMappingsForm').find("input").each(function(){
        var id = $(this).attr('id');
        document.getElementById(id).value = mappedKeys[counter];
        counter++;
      });

      systemSettings.keys = oldKeyMappings;
    } else {
      console.log('no dupes; to submit!')
      $scope.validationError = false;
      //add in the keys that the mobile controller needs
      _.extend(newKeyMappings, window.mobileControllerKeys);

      //submit the new mappings
      systemSettings.keys = newKeyMappings;

      //reset the cycle
      newKeyMappings = {};
      $scope.disabled = true;
      
    }


  };

  $scope.cancelSubmitNewKeyMappings = function() {
    $scope.validationError = false;
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
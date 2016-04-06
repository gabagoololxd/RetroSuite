//pause game screen
app.controller('pauseScreen', function($scope) {
  $scope.chooseNewGame = function () {
    window.chooseNewGame();
  }

  window.systemSettings = {
    "extensions": {
      "gb": "gambatte",
      "gbc": "gambatte",
      "smc": "snes9x-next",
      "fig": "snes9x-next",
      "sfc": "snes9x-next",
      "swc": "snes9x-next",
      "gba": "vba-next",
      "nes": "quicknes",
      "sms": "picodrive",
      "gen": "picodrive",
      "smd": "picodrive",
      "md": "picodrive",
      "32x": "picodrive",
      "mgw": "gw",
      "vec": "vecx"
    },
    "overlays": {
      "gambatte": "./overlays/gamepads/gameboy/",
      "vba-next": "./overlays/gamepads/gba/",
      "snes9x-next": "./overlays/gamepads/snes/",
      "nestopia": "./overlays/gamepads/nes/"
    },
    "keys": {
      //Default keyboard key mappings:
      //IKJL Keys
      "75": "0",  //B
      "76": "1",  //A
      "74": "2",  //Y
      "73": "3",  //X
      //E, U
      "69": "4",  //L
      "85": "5",  //R
      //Enter, Shift
      "16": "8",  //Select
      "13": "9",  //Start
      //WASD keys
      "87": "12",  //Up
      "83": "13",  //Down
      "65": "14",  //Left
      "68": "15", //Right

      //Keys reserved for mobilecontroller; seldom used keys
      "59": "0",  //B
      "61": "1",  //A
      "108": "2",  //Y
      "173": "3",  //X

      "181": "4",  //L
      "182": "5",  //R

      "183": "8",  //Select
      "226": "9",  //Start
      
      "230": "12",  //Up
      "233": "13",  //Down
      "234": "14",  //Left
      "255": "15", //Right
    },
    "urlPrefix": "https://crossorigin.me/"
  }; 

  var newKeyMappings = {
    //Keys reserved for mobilecontroller; seldom used keys. 
    //Mapping new keys overwrite all existing mappings but we want to keep these so we include them here
    "59": "0",  //B
    "61": "1",  //A
    "108": "2",  //Y
    "173": "3",  //X

    "181": "4",  //L
    "182": "5",  //R

    "183": "8",  //Select
    "226": "9",  //Start
    
    "230": "12",  //Up
    "233": "13",  //Down
    "234": "14",  //Left
    "255": "15", //Right

  };

  //used as a cache to store the last state of keys; used when user clicks cancel
  var oldKeyMappings = {};
  
  document.querySelector('body').addEventListener('keydown', function (e) {
    console.log('keycode: ', e.keyCode);
    console.log('code: ', e.code);

    //only do the following if the emulator has started
    if ($('#retro').length < 1){
      return;
    }
    if(retro.classList.contains('hidden')) {
      e.preventDefault();
      try {
        //if the user is not trying to map to a key reserved to the mobilecontroller, then map in new keys
        if(e.keyCode !== "59" && e.keyCode !=="61" && e.keyCode !=="108" && e.keyCode !=="173" && e.keyCode !=="181" && e.keyCode !=="182" && e.keyCode !=="183" && e.keyCode !=="226" && e.keyCode !=="230" && e.keyCode !=="233" && e.keyCode !=="234" && e.keyCode !=="235") {
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
           if(mappingsList[key]==="1" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'bButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="0" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'xButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="3" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'yButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="2" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'startButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="9" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'selectButton':
         for(var key in mappingsList) {
           if(mappingsList[key]==="8" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'upArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="12" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'downArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="13" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'leftArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="14" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rightArrow':
         for(var key in mappingsList) {
           if(mappingsList[key]==="15" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'lShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]==="4" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       case 'rShoulder':
         for(var key in mappingsList) {
           if(mappingsList[key]==="5" && key !== "59" && key !== "61" && key !== "108" && key !== "173" && key !== "181" && key !== "182" && key !== "183" && key !== "226" && key !== "230" && key !== "233" && key !== "234" && key !== "235" ) {
             return window.keyCodes[key];
           }
         }
         break;
       default:
         break;
     }
   } 

  $scope.disabled = true;
  $scope.validationError1 = true;
  // $scope.validationError2 = true;

  $scope.editKeyMappings = function() {
    $scope.disabled = false;
    oldKeyMappings = {};
    // newKeyMappings = {

    // };

    for(keyMapping in systemSettings.keys) {
      oldKeyMappings[keyMapping] = systemSettings.keys[keyMapping];
    };
    console.log('oldKeyMappings',oldKeyMappings);

    // $('#keyMappingsForm').find("input").each(function(ev){
    //    $(this).val("click to edit; type new key");
    // });
  };

  $scope.submitNewKeyMappings = function() {

    // var toSubmit = true;

    // $scope.validationError1 = true;
    // // $scope.validationError2 = true;

    // var newValueTextArray = []
    
    // $('#keyMappingsForm').find("input").each(function(){

    //   var id = $(this).attr('id');

    //   var newValueText = $scope.getValue(id, newKeyMappings);
    //   document.getElementById(id).value = newValueText;

    //   newValueTextArray.push(newValueText);

    // });

    // if(_.contains(newValueTextArray, undefined)) {
    //   var toSubmit = false;
    //   $scope.validationError1 = false;
    //   return;
    // }
    
    // if(toSubmit) {
      // $scope.validationError1 = true;

      systemSettings.keys = {};
      //if newkeyMappings has an undefined, then replace with what was in old key mappings
      for(var mapping in newKeyMappings) {
        console.log('mapppppppp', mapping, " + ", newKeyMappings[mapping]);
      }



      systemSettings.keys = newKeyMappings;
      







      newKeyMappings = {
        //Keys reserved for mobilecontroller; seldom used keys. 
        //Mapping new keys overwrite all existing mappings but we want to keep these so we include them here
        "59": "0",  //B
        "61": "1",  //A
        "108": "2",  //Y
        "173": "3",  //X

        "181": "4",  //L
        "182": "5",  //R

        "183": "8",  //Select
        "226": "9",  //Start
        
        "230": "12",  //Up
        "233": "13",  //Down
        "234": "14",  //Left
        "255": "15", //Right
      };

      $scope.disabled = true;
    // }
  };

  $scope.cancelSubmitNewKeyMappings = function() {
    $('#keyMappingsForm').find("input").each(function(){
      var id = $(this).attr('id');
      var oldValueText = $scope.getValue(id, oldKeyMappings);
      console.log("oldValueText",oldValueText)
      document.getElementById(id).value = oldValueText;
    });
    $scope.disabled = true;
    $scope.validationError1 = true;

  }

});
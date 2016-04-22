//gameController Screen
app.controller('gameSelection', function($scope, $http) {
  //used to hide and show the game selection screen
  $scope.toggleGameSelectionScreen = function() {
    gameSelectionScreen = document.getElementById('gameSelection');
    gameSelectionScreen.classList.add('hidden');
    $scope.$apply();
  }
  window.toggleGameSelectionScreen = $scope.toggleGameSelectionScreen;

  document.getElementById('searchBar').addEventListener('focusin', function() {
    $("#searchBar").css("border-color", "#9767ab");
    $("#filterButton").css("border-left-color", "#9767ab");
    $("#filterButton").css("border-top-color", "#9767ab");
    $("#filterButton").css("border-bottom-color", "#9767ab");
  });

  document.getElementById('searchBar').addEventListener('focusout', function() {
    $("#searchBar").css("border-color", "#cccccc");
    $("#filterButton").css("border-color", "#cccccc");
  });
  
  var loading = document.getElementById('loading');
  $scope.getRom = function (game) {

    console.log('game', game);

    // var p1 = new Promise(function(resolve, reject) { 






      // get the rom from localForage or from IPFS
      var blah = new Promise(function(resolve, reject) {
        // if(game.rom) { //this is a game the user has added in before; we retrieve from chrome.storage.local
        //   window.play(game.rom, game.extension);
        //   document.getElementById('gameSelection').classList.add('hidden');
        //   resolve('success');
        // } else {
        //   return $http({ //this is a game to retrieve from IPFS: fetches ROM data from ipfs, converts to readable method for emulator, loads in the ROM
        //     method: 'GET',
        //     url: game.link,
        //     responseType: 'arraybuffer'
        //   }).then(function successCallback(response) {
        //       window.loadData(game.link.split("/")[5], new Uint8Array(response.data), false);
        //       resolve('success');
        //     }, function errorCallback(response) {
        //       console.log('failuuuure', response);
        //     });
        // }
      });

      var p = Promise.race([
           blah,
           new Promise(function (resolve, reject) {
             setTimeout(function() {reject(new Error('request timeout'))}, 20)
           })
         ])
         p.then(function(response) {console.log(response)});
         p.catch(function(error) {console.log(error)});
      

    // });

    // var p2 = new Promise(function(resolve, reject) { 
    //   setTimeout(resolve, 1000); 
    // });

    // Promise.race([p1, p2]).then(function(value) {
    //   console.log(value);
    // });






    // allow user to reload the app if it takes too long to get the game from IPFS
    setTimeout(function(){
      if(!game.rom) {
        document.getElementById('loadingText2').classList.remove('hidden');
        document.getElementById('clickToRestart').classList.remove('hidden');
      }
    }, 5000);

  }

  //for when the user wants to remove a game they've added in from the list
  $scope.gameToDelete = undefined;
  $scope.removeUserAddedGame = function(game) {
    document.getElementById('deleteGameScreen').classList.remove('hidden');
    $scope.gameToDelete = game;
  }
  
  $scope.cancelDeleteGame = function() {
    document.getElementById('deleteGameScreen').classList.add('hidden');
  }

  $scope.confirmDeleteGame = function(game){
    console.log('game to delete', game);
    //remove from localForage
    window.localForage.getItem('userGames', function(err, value) {
      var newGamesList = _.filter(value, function(existingGame) {
        return existingGame.hash !== game.hash;
      })
      window.localForage.setItem('userGames', newGamesList, function(err, value) {
        console.log('new list of user games ', value);
      });
    })

    //remove from list of games the user sees
    var index = $scope.games.indexOf(game);
    $scope.games.splice(index, 1);   

    document.getElementById('deleteGameScreen').classList.add('hidden');
  }

  //list of available consoles: used to filter list of games
  $scope.consoleList = [{
    id: 1,
    name: 'NES',
  }, {
    id: 2,
    name: 'SNES',
  }, {
    id: 3,
    name: 'GB',
  }, {
    id: 4,
    name: 'GBA',
  }];

  //initialize showing all consoles/games
  $scope.selectedConsole = [1,2,3,4]; 
  
  //'import' list of games to render from gamesList.js and from localForage
  $scope.games = window.gamesList;
  localForage.getItem('userGames', function(err, value) {
    if(value==null) {
      window.localForage.setItem('userGames', [], function(err, value) {
        console.log('initialize userGames array in localForage', value);
      });
    } else {
      value.forEach(function(userGame) {
        window.gamesList.push(userGame);
      });
      console.log('adding userGames array from localForage to user library', value);
    }
    console.log('games', $scope.games)
    $scope.$apply();
  })

  //methods to filter and show games from the list
  $scope.setSelectedConsole = function () {
    var id = this.console.id;
    if (_.contains($scope.selectedConsole, id)) {
      $scope.selectedConsole = _.without($scope.selectedConsole, id);
    } else {
      $scope.selectedConsole.push(id);
    }
    return false;
  };

  $scope.isChecked = function (id) {
    if (_.contains($scope.selectedConsole, id)) {
      return 'icon-ok pull-right';
    }
    return false;
  };

  $scope.checkAll = function () {
      $scope.selectedConsole = _.pluck($scope.consoleList, 'id');
  };

  $scope.getIcon = function (id) {
    if(id===1) {
      return './frontend/img/nes.png';
    } else if (id===2) {
      return './frontend//img/snes.png';
    } else if (id===3) {
      return './frontend/img/gameboy.png';
    } else if (id===4) {
      return './frontend/img/gameboyadvance.png';
    }
  }

});
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

    var romToLoad = game.rom.split(',');
    console.log('game', game);
    loading.classList.remove('hidden');
    setTimeout(function(){
      document.getElementById('loadingText2').classList.remove('hidden');
      document.getElementById('clickToRestart').classList.remove('hidden');
    }, 5000);

    if(game.rom) { //this is a game the user has added in before; we retrieve from chrome.storage.local
      window.play(romToLoad, game.extension);
      document.getElementById('gameSelection').classList.add('hidden');
    } else {
      return $http({ //Fetches ROM data from ipfs, converts to readable method for emulator, loads in the ROM
        method: 'GET',
        url: game.link,
        responseType: 'arraybuffer'
      }).then(function successCallback(response) {
          window.loadData(game.link.split("/")[5], new Uint8Array(response.data), false);
        }, function errorCallback(response) {
          console.log('failuuuure', response);
        });
    }


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
    //remove from chrome.storage.local
    chrome.storage.local.get('userGames', function(obj) {
      var newGamesList = _.filter(obj.userGames, function(existingGame) {
        return existingGame.rom !== game.rom;
      })
      chrome.storage.local.set({'userGames': newGamesList});
      console.log('newGamesList', newGamesList);
    });

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
  
  //'import' list of games to render from gamesList.js
  $scope.games = window.gamesList;
  chrome.storage.local.get('userGames', function(obj) {
    obj.userGames.forEach(function(userGame) {
      $scope.games.push(userGame);
    });
  });

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

  //
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
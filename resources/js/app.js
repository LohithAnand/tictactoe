function Game() {
  this.player1;
  this.player2;

  this.state = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  this.currentPlayer = 1;

  this.begin = function(player1, player2) {
    console.log("start - ", player1, player2);
    this.player1 = player1;
    this.player2 = player2;

    this.playerTurn();
  }

  this.showMessage = function(msg) {
    jQuery('#msg').text(msg);
  }

  /*
00 01 02
10 11 12
20 21 22
  */

  this.player1Wins = function() {
    var res = false;
    //player1
    //row 1
    if(this.state[0][0] === this.player1.symbol && this.state[0][1] === this.player1.symbol && this.state[0][2] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //row 2
    if(this.state[1][0] === this.player1.symbol && this.state[1][1] === this.player1.symbol && this.state[1][2] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //row 1
    if(this.state[2][0] === this.player1.symbol && this.state[2][1] === this.player1.symbol && this.state[2][2] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //col 1
    if(this.state[0][0] === this.player1.symbol && this.state[1][0] === this.player1.symbol && this.state[2][0] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //col 2
    if(this.state[0][1] === this.player1.symbol && this.state[1][1] === this.player1.symbol && this.state[2][1] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //col 3
    if(this.state[0][2] === this.player1.symbol && this.state[1][2] === this.player1.symbol && this.state[2][2] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //diagonal 1
    if(this.state[0][0] === this.player1.symbol && this.state[1][1] === this.player1.symbol && this.state[2][2] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    //diagonal 2
    if(this.state[0][2] === this.player1.symbol && this.state[1][1] === this.player1.symbol && this.state[2][0] === this.player1.symbol) {
      //player1 won
      res = true;
    }
    return res;
  }

  /*
00 01 02
10 11 12
20 21 22
  */

  this.player2Wins = function() {
    var res = false;
    //player2
    //row 1
    if(this.state[0][0] === this.player2.symbol && this.state[0][1] === this.player2.symbol && this.state[0][2] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //row 2
    if(this.state[1][0] === this.player2.symbol && this.state[1][1] === this.player2.symbol && this.state[1][2] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //row 1
    if(this.state[2][0] === this.player2.symbol && this.state[2][1] === this.player2.symbol && this.state[2][2] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //col 1
    if(this.state[0][0] === this.player2.symbol && this.state[1][0] === this.player2.symbol && this.state[2][0] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //col 2
    if(this.state[0][1] === this.player2.symbol && this.state[1][1] === this.player2.symbol && this.state[2][1] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //col 3
    if(this.state[0][2] === this.player2.symbol && this.state[1][2] === this.player2.symbol && this.state[2][2] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //diagonal 1
    if(this.state[0][0] === this.player2.symbol && this.state[1][1] === this.player2.symbol && this.state[2][2] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    //diagonal 2
    if(this.state[0][2] === this.player2.symbol && this.state[1][1] === this.player2.symbol && this.state[2][0] === this.player2.symbol) {
      //player2 won
      res = true;
    }
    return res;
  }

  this.isGameOver = function() {
    var res = false;
    if(this.player1Wins() || this.player2Wins() || this.turns >= 9) res = true;
    return res;
  }

  this.turns = 0;
  this.playerTurn = function() {
    var thisInstance = this;
    if(!this.isGameOver()) {
      this.showMessage("" + thisInstance['player' + thisInstance.currentPlayer].name + "'s turn.");
      jQuery(".gameboard").find(".game-cell").not('.played-cell').on('click', function(e) {
        thisInstance.turns++;
        jQuery(".gameboard").find(".game-cell").not('.played-cell').off('click');
        var index = jQuery(e.currentTarget).data('index');
        index = index.split(',');
        thisInstance.state[parseInt(index[0])][parseInt(index[1])] = thisInstance['player'+thisInstance.currentPlayer].symbol;
        jQuery(e.currentTarget).find('.game-move-indicator').text(thisInstance['player'+thisInstance.currentPlayer].symbol);
        jQuery(e.currentTarget).addClass("played-cell");
        if(thisInstance.currentPlayer == 1) thisInstance.currentPlayer = 2;
        else thisInstance.currentPlayer = 1;

        thisInstance.playerTurn();
      });
    } else {
      this.gameOver();
    }
  }

  this.gameOver = function() {
    var message = "It's a tie!";
    if(this.player1Wins()) {
      message = this.player1.name + " wins!";
    } else if(this.player2Wins()) {
      message = this.player2.name + " wins!";
    }
    this.showMessage(message);

    //reset game??
  }

  this.setupPlayers = function() {
    let thisInstance = this;
    jQuery('#players-modal').modal({
      backdrop: 'static',
      keyboard: false
    });
    jQuery('#start-game').one('click', function() {
        jQuery('#players-modal').modal('hide');
        thisInstance.begin(
          {
            name: jQuery('#player1').val() || 'Player1',
            symbol: jQuery('#player1-symbol').val() || 'O'
          },
          {
            name: jQuery('#player2').val() || 'Player2',
            symbol: jQuery('#player2-symbol').val() || 'X'
          }
        );
        thisInstance.registerEvents();
    });
  }

  this.restartGame = function() {
    //reset state, turns, clear board and begin
    this.state = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    this.turns = 0;

    jQuery('.game-cell').removeClass('played-cell');
    jQuery('.game-move-indicator').text('');

    this.currentPlayer = 1;

    this.begin(this.player1, this.player2);
  }

  this.registerRestartGameEvent = function() {
    var thisInstance = this;
    jQuery('#restart-game').on('click', function() {
      thisInstance.restartGame();
    });
  }

  this.registerEvents = function() {
    this.registerRestartGameEvent();
  }
}

jQuery(document).ready(function() {
  var game = new Game();
  game.setupPlayers();
});

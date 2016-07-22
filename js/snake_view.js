const Board = require('./board.js');
const Snake = require('./snake.js');

function SnakeView (board, $rootEl) {
  this.board = board;
  this.$rootEl = $rootEl;
  this.score = 0;
  this.setupDisplay();
  this.bindKeys();
  this.currentSpeed = 500;
  this.ourTimeout;
  this.highScore = 0;
}

SnakeView.prototype.setupDisplay = function () {
  for (var i = 0; i < this.board.grid.length; i++) {
    let ul = this.$rootEl.append('<ul class="row"></ul>');
    for (var j = 0; j < this.board.grid[i].length; j++) {
      $(ul).append(`<li class="square" pos="[${[i,j]}]"></li>`);
    }
  }
  $('body').append('<figure class="score"></figure>');
  $('body').append('<figure class="high-score"></figure>');
  // $('body').append('<figure class="new-game">New Game</figure>');
  $('body').append('<figure class="new-game">↻</figure>');


  this.render();
};

SnakeView.prototype.raiseSpeed = function () {
  this.currentSpeed = Math.floor(this.currentSpeed * 0.80);
  // console.log(this.currentSpeed);
};

SnakeView.prototype.bindKeys = function () {

  let thisSnake = this.board.snake;
  $(document).keydown( e => {
    switch(e.which) {
      case 37: // left
      thisSnake.turn("W");
      thisSnake.move();
      break;

      case 38: // up
      thisSnake.turn("N");
      thisSnake.move();
      break;

      case 39: // right
      thisSnake.turn("E");
      thisSnake.move();
      break;

      case 40: // down
      thisSnake.turn("S");
      thisSnake.move();
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault();
    this.render();
  });

  $('.new-game').on("click", event => {
    this.newGame();
  });


};

SnakeView.prototype.run = function () {
  if (this.board.isOver()) {
    this.endGame();
  } else if (this.board.isKilled === true) {
    this.newGame();
    //this is a sepatate call to kill the board.
  } else {
    // const callback = this.turn.bind(this);
    // window.setTimeout(callback, this.currentSpeed);
    const callback = this.turn.bind(this);
    const currSpeed = this.currentSpeed;
    this.ourTimeout = window.setTimeout(callback, currSpeed);
  }
};

SnakeView.prototype.turn = function () {
  this.board.snake.move();
  // this.score++;
  this.render();
  this.run();
};


SnakeView.prototype.render = function () {

  let currSnake = this.board.snake;
  let currBoard = this.board;

  $('.tail').removeClass('tail');

  currSnake.segments.forEach( function(linkPos, idx) {
    $(`li[pos='[${linkPos}]']`).addClass('snake');
    if (idx === currSnake.segments.length - 1) {
      $(`li[pos='[${linkPos}]']`).removeClass('snake');
      $(`li[pos='[${linkPos}]']`).addClass('tail');
    }
  });

  let applePos = this.board.apple;
  $(`li[pos='[${applePos}]']`).addClass('apple');

  if (applePos[0] === currSnake.pos()[0] && applePos[1] === currSnake.pos()[1]) {
    $(`li[pos='[${applePos}]']`).removeClass('apple');
    this.score += ((501 - this.currentSpeed) * 2);
    this.raiseSpeed();
    currBoard.eatApple(applePos);
  }

  if (this.highScore === undefined) { this.highScore = this.score; }
  else if (this.score > this.highScore) { this.highScore = this.score; }

  $('.score').text(`${this.score}`);
  $('.high-score').text(`${this.highScore}`);

};

SnakeView.prototype.endGame = function () {
  $(document).unbind('keydown');

  alert(`Score: ${this.score}`);
  console.log(this.board.objId);
  $('.score').addClass(`final-score`);
};

SnakeView.prototype.newGame = function () {
  $('.score').remove();
  $('.new-game').remove();
  $('.high-score').remove();
  $('.snake-container').empty();
  this.board.isKilled = true;
  window.clearTimeout(this.ourTimeout);
  this.ourTimeout = null;


  this.board = null;
  this.board = new Board();
  this.score = 0;
  this.setupDisplay();
  this.bindKeys();
  this.currentSpeed = 500;
  this.run();
};

module.exports = SnakeView;

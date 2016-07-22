/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	const Snake = __webpack_require__(2);
	const SnakeView = __webpack_require__(3);

	$( () => {
	  console.log("goo0d work you");
	  const $rootEl = $('.snake-container');
	  const board = new Board();
	  const view = new SnakeView(board, $rootEl);
	  view.run();
	  // const $rootEl = $('.hanoi');
	  // const game = new HanoiGame();
	  // new HanoiView(game, $rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(2);

	function Board() {
	  this.snake = new Snake([15,15]);
	  this.grid = [[]];
	  this.apple = [];
	  this.gWidth = 30;
	  this.gHeight = 30;
	  this.isKilled = false;
	  this.createGrid();
	  this.objId = Math.floor(Math.random()*1000); 
	}

	Board.prototype.createGrid = function () {
	  for (var i = 0; i < this.gHeight; i++) {
	    this.grid[i] = [];
	    for (var j = 0; j < this.gWidth; j++) {
	      this.grid[i][j] = 0;
	    }
	  }
	  this.placeApple();
	};

	Board.prototype.placeApple = function () {
	  const randX = Math.floor(this.grid.length * Math.random());
	  const randY = Math.floor(this.grid[0].length * Math.random());
	  // this.apples.push([randX, randY]);
	  this.apple = [randX, randY];

	};

	Board.prototype.eatApple = function (applePos) {
	  // debugger
	  // this.apples.splice(this.apples.findIndex(applePos));
	  this.snake.eatApple();
	  this.placeApple();
	};

	Board.prototype.isOver = function () {
	  // console.log(this.snake.pos());
	  if (this.snake.pos()[0] < 0 || this.snake.pos()[0] >= this.gWidth ||
	      this.snake.pos()[1] < 0 || this.snake.pos()[1] >= this.gHeight) {
	        // console.log('hi');
	        this.isKilled = true;
	        return true;
	  }

	  for (var i = 1; i < this.snake.segments.length; i++) {
	    if (this.snake.segments[i][0] === this.snake.pos()[0] &&
	        this.snake.segments[i][1] === this.snake.pos()[1]) {
	        this.isKilled = true;
	        return true;
	    }
	  }

	};


	module.exports = Board;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);

	function Snake (pos) {
	  this.direction = "W";
	  this.segments = [];
	  // this.pos = this.getPos;
	  this.snakeLength = 5; // last element of snake is a tail removing style
	  this.buildSnake(pos);
	}

	Snake.prototype.move = function () {
	  switch (this.direction) {
	    case "N":
	      this.segments.unshift([this.segments[0][0] - 1, this.segments[0][1]]);
	      break;
	    case "W":
	      this.segments.unshift([this.segments[0][0], this.segments[0][1] - 1]);
	      break;
	    case "E":
	      this.segments.unshift([this.segments[0][0], this.segments[0][1] + 1]);
	      break;
	    case "S":
	      this.segments.unshift([this.segments[0][0] + 1, this.segments[0][1]]);
	      break;
	  }
	  this.segments.pop();
	};

	Snake.prototype.pos = function () {
	  return this.segments[0];
	};


	Snake.prototype.buildSnake = function (pos) {
	  for (var i = 0; i < this.snakeLength; i++) {
	    this.segments.push([pos[0], pos[1] + i]);
	  }
	};

	Snake.prototype.turn = function (dir) {
	  this.direction = dir;
	};

	Snake.prototype.eatApple = function () {
	  this.segments.push(this.segments[this.snakeLength - 1]);
	  this.snakeLength += 1;
	};


	Snake.DIRECTIONS = ["N", "E", "S", "W"];

	module.exports = Snake;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	const Snake = __webpack_require__(2);

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


/***/ }
/******/ ]);
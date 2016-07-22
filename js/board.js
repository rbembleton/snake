const Snake = require('./snake.js');

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

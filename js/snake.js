const Board = require('./board.js');

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

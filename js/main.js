var Board = require('./board.js');
var Snake = require('./snake.js');
var SnakeView = require('./snake_view.js');

// $( () => {
//   console.log("goo0d work you");
//   var $rootEl = $('.snake-container');
//   var board = new Board();
//   var view = new SnakeView(board, $rootEl);
//   view.run();
//   // var $rootEl = $('.hanoi');
//   // var game = new HanoiGame();
//   // new HanoiView(game, $rootEl);
// });

$( function () {
  console.log("goo0d work you");
  var $rootEl = $('.snake-container');
  var board = new Board();
  var view = new SnakeView(board, $rootEl);
  view.run();
  // var $rootEl = $('.hanoi');
  // var game = new HanoiGame();
  // new HanoiView(game, $rootEl);
});

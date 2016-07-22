const Board = require('./board.js');
const Snake = require('./snake.js');
const SnakeView = require('./snake_view.js');

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

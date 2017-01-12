var TETRIS = TETRIS || {};
var controller = TETRIS.controller = {
  
  interval: undefined,
  speed: 400,
  init: function() {
    callbacks = {
      pieceAction: controller.pieceAction,
      resetGame: controller.resetGame
    }
    model.init();
    view.init(callbacks);
    controller.interval = setInterval(controller.gameLoop, controller.speed);
  },

  gameLoop: function() {
    view.renderBoard(model.board, model.score);
    if(!!model.justCompleted){
      model.checkCompletedRows()
      model.justCompleted = false
      controller.speed -= 10
      clearInterval(controller.interval)
      controller.interval = setInterval(controller.gameLoop, controller.speed) 
    }
    model.fallPiece();
    if(model.gameOver()){
      view.gameOver(model.score)
      clearInterval(controller.interval)
    }
  },

  resetGame: function(){
    model.board = new TETRIS.Board({top: 0, left: 0, right: 10, bottom: 20})
    model.justCompleted = undefined
    controller.init()
  },

  pieceAction: function(event){
    model.pieceAction(event)
    view.renderBoard(model.board, model.score);
  }

}

$(document).ready(function() {
  console.log('ready')
  controller.init();
})
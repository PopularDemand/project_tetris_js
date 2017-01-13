var TETRIS = TETRIS || {};
var controller = TETRIS.controller = {
  
  interval: undefined,
  init: function() {
    controller.speed = 400
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
      var rowsCompleted = model.checkCompletedRows()
      model.justCompleted = false
    }
    if (rowsCompleted) {
      controller.increaseSpeed(rowsCompleted)
    }
    model.fallPiece();
    if(model.gameOver()){
      view.gameOver(model.score)
      clearInterval(controller.interval)
    }
  },

  resetGame: function(){
    model.board = new TETRIS.Board({top: 0, left: 0, right: 10, bottom: 20})
    // model.justCompleted = undefined
    clearInterval(controller.interval)
    controller.init()
  },

  pieceAction: function(event){
    model.pieceAction(event)
    view.renderBoard(model.board, model.score);
  },

  increaseSpeed: function(multiplier) {
    controller.speed -= 10 * multiplier
    clearInterval(controller.interval)
    controller.interval = setInterval(controller.gameLoop, controller.speed) 
  }

}

$(document).ready(function() {
  // console.log('ready')
  controller.init();
})
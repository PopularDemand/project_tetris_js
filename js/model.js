"use strict";

var TETRIS = TETRIS || {};
var model = TETRIS.model = {
  board: new TETRIS.Board({top: 0, left: 0, right: 10, bottom: 20}),

  justCompleted: undefined,

  init: function() {
    model.generatePiece();
  },

  generatePiece: function() {
    model.board.piece = new TETRIS.Piece(0); // what shape
  },

  fallPiece: function() {
    if (model.stopConditions()) {
      console.log("stop conditions met")
      model.lockPiece();
      return 'stopped';
    } else {
      model.board.piece.fall();
    }
  },

  stopConditions: function() {
    var atBottom = false;
    var atStatic = false;
    model.board.piece.blocks.forEach(function(block) {
      atBottom = block.y === model.board.edges.bottom - 1;
      // console.log(`atBottom ${atBottom}`)
      for(var i = model.board.blockArray.length - 1; i >= 0; i--) {
        var staticBlock = model.board.blockArray[i];
        atStatic = model.pieceAtStatic(block, staticBlock);
        // console.log(`atStatic ${atStatic}`)
        if (atStatic) {
          break;
        }
      }
    })

    return atBottom || atStatic;
  },

  lockPiece: function() {
    model.board.piece.blocks.forEach(function(block) {
      model.board.blockArray.push(block);
      model.board.boardState[block.y] += 1;
    });
    model.justCompleted = model.board.piece
    model.generatePiece();
  },

  pieceAtStatic: function(block, staticBlock) {
    return block.x === staticBlock.x
      && block.y + 1 === staticBlock.y;
  },

  pieceAction: function(event){
    if (event.which === 40) {
            model.dropPiece();
    }else{

    if(!model.moveInvalid(event.which)){
          
          model.board.piece.move(event.which)}
    }
  },

  dropPiece: function() {
    var stopped;
    while (!stopped) {
      stopped = this.fallPiece();
    }
  }, 

  moveInvalid: function(move){
    var atEdge = false;
    var atStatic = false;
    model.board.piece.blocks.forEach(function(block) {
      if(move === 37 && block.x === model.board.edges.left){
        atEdge = true
      }else if(move === 39 && block.x === model.board.edges.right - 1){
        atEdge = true
      }
      // console.log(`atBottom ${atBottom}`)
      for(var i = model.board.blockArray.length - 1; i >= 0; i--) {
        var staticBlock = model.board.blockArray[i];
        atStatic = model.adjacentStatic(block, staticBlock, move);
        // console.log(`atStatic ${atStatic}`)
        if (atStatic) {
          break;
        }
      }
    })

  return atEdge || atStatic;
  },

  adjacentStatic: function(block, staticBlock, move){
    if(move === 37){
      return block.x - 1 === staticBlock.x && block.y === staticBlock.y;
    }else if(move === 39){
      return block.x + 1 === staticBlock.x && block.y === staticBlock.y;
    }
  },

  checkCompletedRows: function(){
    var completedRows = []
    model.board.boardState.forEach(function(row, index){
      if(row === 10){ 
        completedRows.push(index)
        model.board.resetState(index)
      }       
    });
      
    for (var i = model.board.blockArray.length - 1; i >= 0; i--){
      if(completedRows.includes(model.board.blockArray[i].y)){
        model.board.blockArray.splice(i, 1)
      }
    };
    for (var j = 0; j < model.board.blockArray.length; j++) {
      completedRows.forEach(function(row) {
        if (model.board.blockArray[j].y < row) {
          model.board.blockArray[j].y += 1;
          model.board.boardState[row - 1] -= 1;
          console.log('increasing row ' + row)
          console.log('block y ' + model.board.blockArray[j].y)
          model.board.boardState[row] += 1;
        }
      })
    }
  
  }


};

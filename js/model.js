"use strict";

var TETRIS = TETRIS || {};
var model = TETRIS.model = {
  board: new TETRIS.Board({top: 0, left: 0, right: 10, bottom: 20}),

  justCompleted: undefined,
  score: 0,

  init: function() {
    model.generatePiece();
  },

  generatePiece: function() {
    model.board.piece = new TETRIS.Piece(model.randPiece(7)); // what shape
  },

  randPiece: function(max){
    return Math.floor(Math.random() * max) + 1

  },

  gameOver: function(){
    var done = false
    for(var i = model.board.blockArray.length - 1; i >= 0; i-- ){
      if(model.board.blockArray[i].y <= -1){
        done = true
        break;
      }
    }
    return done
  },

  fallPiece: function(){
    if(model.stopConditions()) {
      model.lockPiece();
      return 'stopped';
    } else {
      model.board.piece.fall();
    }
  },

  stopConditions: function() {
    var atBottom = false;
    var atStatic = false;
    for(var j = model.board.piece.blocks.length - 1; j >= 0; j--){
          var block = model.board.piece.blocks[j]
          atBottom = block.y === model.board.edges.bottom - 1;
          if (atBottom){
            break;
          }
      for(var i = model.board.blockArray.length - 1; i >= 0; i--) {
        var staticBlock = model.board.blockArray[i];
        atStatic = model.pieceAtStatic(block, staticBlock);
        // console.log(`atStatic ${atStatic}`)
        if (atStatic) {
          break;
        }
      }
      if (atStatic) {
          break;
        }
    }

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
    }else if(event.which === 38 && !model.validRotation()){
      console.log("invalid rotation")
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

  validRotation: function(){
    var valid = true
    model.board.piece.rotate('right')
    if(model.insideWall()){
      valid = false
    }
    model.board.piece.rotate('right')
    model.board.piece.rotate('right')
    model.board.piece.rotate('right')
    return valid
  },

  insideWall: function(){
    var inside = false

    for(var j = 0; j < model.board.piece.blocks.length; j++){
     for(var i = 0; i < model.board.blockArray.length; i++){
        if(model.board.piece.blocks[j].x === model.board.blockArray[i].x && model.board.piece.blocks[j].y === model.board.blockArray[i].y){
          inside = true
        }
     }
   }
    
  return inside
  },

  moveInvalid: function(move){
    var atEdge = false;
    var atStatic = false;
    for (var j = 0; j < model.board.piece.blocks.length; j++){
      var block = model.board.piece.blocks[j]
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
      if (atStatic) {
        break;
      }
    }

    return atEdge || atStatic;
  },

  adjacentStatic: function(block, staticBlock, move){
    if(move === 37){
      var directLeft = block.x - 1 === staticBlock.x && block.y === staticBlock.y;
      // check here first
      var bottomLeft = block.x - 1 === staticBlock.x && block.y === staticBlock.y - 1;
      return directLeft || bottomLeft
    }else if(move === 39){
      return block.x + 1 === staticBlock.x && block.y === staticBlock.y;
    }
  },

  checkCompletedRows: function(){
    var completedRows = []
    model.board.boardState.forEach(function(blocksInRow, row){
      if(blocksInRow === 10){ 
        completedRows.push(row)
        model.board.resetState(row)
      }       
    });
      
    for (var i = model.board.blockArray.length - 1; i >= 0; i--){
      if(completedRows.includes(model.board.blockArray[i].y)){
        model.board.blockArray.splice(i, 1)
      }
    };
    for (var j = 0; j < model.board.blockArray.length; j++) {
      // for each row
      completedRows.forEach(function(row) {
        // if the block y is lower than the row
        // make that y even lower
        // make the row where it was smaller
        // make the row where it's going larger
        if (model.board.blockArray[j].y < row) {
          model.board.boardState[model.board.blockArray[j].y] -= 1;
          model.board.blockArray[j].y += 1;
          model.board.boardState[model.board.blockArray[j].y] += 1;
        }
      })
    }
    model.score += completedRows.length;
  }


};

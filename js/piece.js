var TETRIS = TETRIS || {};
var Piece = TETRIS.Piece = function(params) {
  this.DIRECTION_DEGREES = {
    left: Math.PI / 2,
    right: -Math.PI / 2
  }
  this.blocks = []
  this.type = params


  this.generateSquare = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
  }

  this.generateBar = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 3, -1, this.type))
  }

  this.generateRightL = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, -2, this.type))
  }

  this.generateLeftL = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial, - 2, this.type))
  }

  this.generateRightS = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, - 2, this.type))
  }

  this.generateLeftS = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, - 1, this.type))
  }

  this.generateT = function(initial) {
    this.blocks.push (new TETRIS.Block(initial, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -1, this.type))
    this.blocks.push (new TETRIS.Block(initial + 1, -2, this.type))
    this.blocks.push (new TETRIS.Block(initial + 2, -1, this.type))
  }

  this.randCoord = function(max){
    return Math.floor(Math.random() * max)
  }

  this.generateBlocks = function(input){
    var initial;
    var blocks = []
    if(input === 0){
      this.blocks.push(new TETRIS.Block(this.randCoord(10),-1))
    } else if(input === 1){
      initial = this.randCoord(9)
      this.generateSquare(initial)
    } else if(input === 2){
      initial = this.randCoord(6)
      this.generateBar(initial)
    } else if(input === 3){
      initial = this.randCoord(7)
      this.generateRightL(initial) // ___|
    } else if(input === 4){
      initial = this.randCoord(7)
      this.generateLeftL(initial)  // |___
    } else if(input === 5){
      initial = this.randCoord(7)  //   _
      this.generateRightS(initial) // _|
    } else if(input === 6){
      initial = this.randCoord(7)  // _
      this.generateLeftS(initial)  //  |_
    } else if(input === 7){
      initial = this.randCoord(7)  // ___
      this.generateT(initial)      //  |
    }
    this.pivotBlock = this.blocks[1] // Push order is important, already set
  }

  this.generateBlocks(params)


  this.rotate = function(leftOrRight) {
    var degree = this.DIRECTION_DEGREES[leftOrRight]
    var self = this
    if(this.type === 2){
      this.blocks.forEach(function(block) {
        block.lineRotate(self.pivotBlock.x, self.pivotBlock.y, degree)
      })
    }else if (this.type !== 1) {
      this.blocks.forEach(function(block) {
        block.rotate(self.pivotBlock.x, self.pivotBlock.y, degree)
      })
    }
    this.checkPostRotation()
  }

  this.checkPostRotation = function() {
    var delta_x = 0
    for(var i = 0; i < this.blocks.length; i++){
      if(this.blocks[i].x < 0 && this.blocks[i].x < delta_x){
        delta_x = -1*this.blocks[i].x
      }else if(this.blocks[i].x > 9 && this.blocks[i].x > delta_x){
        delta_x = -1 * (this.blocks[i].x - 9)
      }
    }

    for(var i = 0; i < this.blocks.length; i++){
      this.blocks[i].x += delta_x
    }
  }

  this.fall = function() {
    this.blocks.forEach(function(block) {
      block.y += 1;
    })
  }

  this.move = function(direction){
    switch(direction){
      case 37:
        this.sideMove("l")
        break;
      case 39:
        this.sideMove("r")
        break;
      case 40:
        break;
      case 38:
        this.rotate('right')
      default:
        break;
    }
  }

  this.sideMove = function(direction){
    if(direction === "l"){
      this.blocks.forEach(function(block){
        block.x -= 1 
      });
    }else if(direction === "r"){
      this.blocks.forEach(function(block){
        block.x += 1 
      });
    }
  }

}
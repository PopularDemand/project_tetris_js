var TETRIS = TETRIS || {};
var Block = TETRIS.Block = function(x, y, type) {

  this.x = x;
  this.y = y;
  this.type = type;

  this.rotate = function(pivotX, pivotY, degree) {

    // If not on a central axis
    if (pivotX !== this.x && pivotY !== this.y) {
      this.offCenterRotate(pivotX, pivotY)
    } else if (pivotX === this.x && pivotY === this.y) {
      // console.log('THIS IS AN EASTER EGG')
    } else {
      this.rotateRight(pivotX, pivotY)
    }
  }

  this.lineRotate = function(pivotX, pivotY, degree){
    if(pivotY === this.y && pivotX === this.x){

    }else if(pivotY === this.y){
      this.y += pivotX - this.x
      this.x = pivotX
    }else if(pivotX === this.x){
      this.x += pivotY - this.y
      this.y = pivotY
    }
  }


  this.rotateRight = function(pivotX, pivotY) {
    // explicit logic
    var leftOrAtPivot = this.x <= pivotX;
    var rightOrAtPivot = this.x >= pivotX;
    var aboveOrAtPivot = this.y <= pivotY; // visually above
    var belowOrAtPivot = this.y >= pivotY; // visually below
  
    

    // if on -x or -y axis, decrease y coord (visually move up)
    // otherwise decrease
    if (leftOrAtPivot && belowOrAtPivot) {
      this.y--
    } else {
      this.y++
    }

    // if on -y or +x axis, decrease x coord
    if (belowOrAtPivot && rightOrAtPivot) {
      this.x--
    } else {
      this.x++
    }
  }


  this.offCenterRotate = function(pivotX, pivotY) {
    var toLeft = this.x < pivotX
    var above = this.y < pivotY //visually
    var toRight = this.x > pivotX
    var below = this.y > pivotY // visually

    if (toRight && above) {
      this.y += 2
    } else if (toRight && below){
      this.x -= 2
    } else if (toLeft && below) {
      this.y -= 2
    } else if (toLeft && above) {
      this.x += 2
    } else {
      console.log('something went wrong')
    }
  }
}

var TETRIS = TETRIS || {};
var view = TETRIS.view = {
  
  listener: undefined,

  init: function(callbacks) {
    $(document).off()
    view.initializeBoard();
    $(document).keydown(callbacks.pieceAction)
    $('#reset-btn').click(callbacks.resetGame)
  },

  renderBoard: function(board, score) {
    $('.active').removeClass('active').removeClass("block").css('background-color', 'white');
    $('.static').removeClass('static').removeClass('block').css('background-color', 'white');
    board.blockArray.forEach(function(block){
      view.renderObject(block.x, block.y, "static", block.type)
    });

    board.piece.blocks.forEach(function(block){
      view.renderObject(block.x, block.y, "active", block.type)
    });
    view.renderScore(score)
  },

  renderObject: function(x,y, klass, type){
    var $coords = $(".cell").filter("[data-x='" + x +"']").filter("[data-y='" + y +"']");
    $coords.addClass("block").addClass(klass).css('background-color', view.typeToColor[type])
  },

  renderScore: function(score) {
    $('#score').text('Current Score: ' + score)
  },

  gameOver: function(score){
    $("#defeat").css("display", "inline-block")
    $('#score').text('Final Score: ' + score)
  },

  initializeBoard: function() {
    $("#defeat").hide()
    $('#score').text('Current Score: 0')
    $('.cell').remove()
    $('br').remove()
    for (var row = 0; row < 20; row++) {
      for (var col = 0; col < 10; col++) {
        var $div = $('<div>').addClass('cell')
        .attr({
          "data-x": col,
          "data-y": row
        });
        $('#board').append($div);
      }
      $('#board').append('<br>');
    }
  },

  typeToColor: [
    undefined,
    '#33FF00',
    '#E6FB04',
    '#00FFFF',
    '#FF0099',
    '#FF3300',
    '#CC00FF',
    '#FF6600'
  ]

}
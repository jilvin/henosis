$( function() {
  $('#henosis').draggable()
  .bind('mousedown', function(event, ui){
    // bring target to front
    $(event.target.parentElement).append( event.target );
  }).bind('drag', function(event, ui){
    // update coordinates manually, since top/left style props don't work on SVG
    event.target.setAttribute('cx', ui.position.left+30);
    event.target.setAttribute('cy', ui.position.top+30);
  });
} );
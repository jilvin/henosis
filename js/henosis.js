$( function() {
  $('#henosis').draggable({
  containment: "window"
})
  .bind('mousedown', function(event, ui){
    // bring target to front
    $(event.target.parentElement).append( event.target );
  }).bind('drag', function(event, ui){
    // var xMin = 0;
    // var xMax =300;
    // var yMin = 0;
    // var yMax = 300;
    var leftPosition = ui.position.left+30;
    var topPosition = ui.position.top+30;
    // if(leftPosition>=xMin && leftPosition<=xMax)
    // {
      // update coordinates manually, since top/left style props don't work on SVG
      event.target.setAttribute('cx', leftPosition);
    // }
    // if(topPosition>=yMin && topPosition<=yMax)
    // {
      event.target.setAttribute('cy', topPosition);
    // }
  });
} );
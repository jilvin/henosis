$(window).on("resize", function () {
$( function() {
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  $('#henosis').draggable({
    containment: [ 0, 0, windowWidth-40, windowHeight-40]
  })
  .bind('mousedown', function(event, ui){
    // bring target to front
    $(event.target.parentElement).append( event.target );
  }).bind('drag', function(event, ui){
    var leftPosition = ui.position.left+(windowWidth/2);
    var topPosition = ui.position.top+(windowHeight/2);
    // update coordinates manually, since top/left style props don't work on SVG
    event.target.setAttribute('cx', leftPosition);
    event.target.setAttribute('cy', topPosition);
    changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
  });
} );
}).resize();
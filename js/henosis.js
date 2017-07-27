function setHenosisAtCentre()
{
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  document.getElementById("henosis").setAttribute('cx', windowWidth/2);
  document.getElementById("henosis").setAttribute('cy', windowHeight/2);
  changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
}

setHenosisAtCentre();

// See: https://www.sitepoint.com/jquery-refresh-page-browser-resize/
//refresh page on browser resize
$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


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

// pageloading part -- start
var colors = new Array( "Violet", "Indigo", "Blue", "Green", "Yellow", "Orange", "Red");
var colornow=0;

function changeBackground(color) {
  //  document.body.style.background = color;
   document.getElementById("henosis").setAttribute('fill', color);
}

function incrementcolor() {
	if(colornow==6) {
		colornow=0;
	}
	else {
		colornow++;
	}
}

function loopLi() {
setTimeout(function () {
     changeBackground(colors[colornow]);
	incrementcolor();
	loopLi();
}, 1000);
}

loopLi();
// pageloading part -- end
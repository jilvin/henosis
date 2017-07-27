var svgNS = "http://www.w3.org/2000/svg";
var displayNow = 0;
var possibleDisplays = 2;

function createActCircle(cx, cy)
{
    var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
    myCircle.setAttributeNS(null,"id","actCircle");
    myCircle.setAttributeNS(null,"cx",cx);
    myCircle.setAttributeNS(null,"cy",cy);
    myCircle.setAttributeNS(null,"r",20);
    myCircle.setAttributeNS(null,"fill","white");
    myCircle.setAttributeNS(null,"stroke","none");
    myCircle.setAttributeNS(null,"style","opacity: 1;");
    document.getElementById("henosisLayer").appendChild(myCircle);
}

function createActCircleShadow(cx, cy)
{
    var myCircle = document.createElementNS(svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
    myCircle.setAttributeNS(null,"id","actCircleShadow");
    myCircle.setAttributeNS(null,"cx",cx);
    myCircle.setAttributeNS(null,"cy",cy);
    myCircle.setAttributeNS(null,"r",20);
    myCircle.setAttributeNS(null,"fill","grey");
    myCircle.setAttributeNS(null,"stroke","none");
    document.getElementById("henosisLayer").appendChild(myCircle);
}

function setHenosisAtCentre()
{
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  document.getElementById("henosis").setAttribute('cx', windowWidth/2);
  document.getElementById("henosis").setAttribute('cy', windowHeight/2);
  changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
}

function displayToggle()
{
  if(displayNow==0)
  {
    displayNow++;
    document.getElementById("container"+displayNow).style.display = "block";
  }
}

function reduceOpacity()
{
  setTimeout(function () {
    var opacity = document.getElementById("actCircle").style.opacity;
    if(opacity>0)
    {
      document.getElementById("actCircle").style.opacity = (parseFloat(opacity)-parseFloat(0.1));
      reduceOpacity();
    }
    else
    {
      document.getElementById("actCircle").remove();
    }
  }, 100);
}

function scaleUpActComplete()
{
  document.getElementById("actCircleShadow").remove();
  displayToggle();
  reduceOpacity();
}

function henosisActCircleScaleUpAct(maxValue)
{
  setTimeout(function () {
    var radius = document.getElementById("actCircle").getAttribute('r');
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    if(radius<maxValue)
    {
      document.getElementById("actCircle").setAttribute('r', parseFloat(radius)+parseFloat(maxValue/30));
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "actCircle", "actCircleShadow");
      henosisActCircleScaleUpAct(maxValue);
    }
    else
    {
      scaleUpActComplete();
    }
  }, 10);
}

function henosisScaleUpActStart()
{
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var diagonalLength = Math.sqrt((windowWidth*windowWidth)+(windowHeight*windowHeight));
  var cx = document.getElementById("henosis").getAttribute('cx');
  var cy = document.getElementById("henosis").getAttribute('cy');
  createActCircleShadow(cx, cy);
  createActCircle(cx, cy);
  changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "actCircle", "actCircleShadow");
  henosisActCircleScaleUpAct(diagonalLength);
}

function displayNone()
{
  document.getElementById("container1").style.display = "none";
  document.getElementById("container2").style.display = "none";
}

function start(){
  displayNone();
  setHenosisAtCentre();
}

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
var colornow=1;
var loopStop=0;
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
    if(loopStop==0)
    {
      loopLi();
    }
    else
    {
      document.getElementById("henosis").setAttribute('fill', "white");
      henosisScaleUpActStart();
    }
  }, 1000);
}

loopLi();
// pageloading part -- end

// pageloaded -- start
$(window).on('load', function()
{
  loopStop=1;
});
// pageloaded -- end

start();
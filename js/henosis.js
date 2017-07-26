function setHenosisAtCentre()
{
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  document.getElementById("henosis").setAttribute('cx', windowWidth/2);
  document.getElementById("henosis").setAttribute('cy', windowHeight/2);
  changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
}
setHenosisAtCentre();

$(window).on("resize", function () {
  var xCoordinate = parseFloat(document.getElementById("henosis").getAttribute("cx"))+parseFloat(20);
  var yCoordinate = parseFloat(document.getElementById("henosis").getAttribute("cy"))+parseFloat(20);
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  if((xCoordinate>windowWidth)||(yCoordinate>windowHeight)||(xCoordinate<0)||(yCoordinate<0))
  {
    if(xCoordinate>windowWidth)
    {
      var leftPosition = (xCoordinate - (xCoordinate - windowWidth)-20);
      document.getElementById("henosis").setAttribute('cx', leftPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
      document.getElementById("henosis").style.left = (parseFloat(leftPosition) - parseFloat(windowWidth/2)-parseFloat(40))+"px";
    }
    if(yCoordinate>windowHeight)
    {
      var topPosition = (yCoordinate - (yCoordinate - windowHeight)-20);
      document.getElementById("henosis").setAttribute('cy', topPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
      document.getElementById("henosis").style.top = (parseFloat(topPosition) - parseFloat(windowHeight/2)-parseFloat(40))+"px";
    }
    if(xCoordinate<0)
    {
      var leftPosition = (20);
      document.getElementById("henosis").setAttribute('cx', leftPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
    }
    if(yCoordinate<0)
    {
      var topPosition = (20);
      document.getElementById("henosis").setAttribute('cy', topPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
    }

    $( function() {
      $('#henosis').draggable({
        containment: [ 0, 0, windowWidth-40, windowHeight-40]
      })
    });
  }
  else
  {
    if(document.getElementById("henosis").style.left!="" && document.getElementById("henosis").style.top!="")
    {
      var leftPosition = parseFloat(document.getElementById("henosis").style.left)+parseFloat(windowWidth/2);
      var topPosition = parseFloat(document.getElementById("henosis").style.top)+parseFloat(windowHeight/2);
      if(leftPosition<0)
      {
        leftPosition = (20);
      }
      if(topPosition<0)
      {
        topPosition = (20);
      }
      document.getElementById("henosis").style.left = (parseFloat(leftPosition) - parseFloat(windowWidth/2))+"px";
      document.getElementById("henosis").style.top = (parseFloat(topPosition) - parseFloat(windowHeight/2))+"px";
      document.getElementById("henosis").setAttribute('cx', leftPosition);
      document.getElementById("henosis").setAttribute('cy', topPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
    }
    $( function() {
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
  }
}).resize();
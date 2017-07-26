$(window).on("resize", function () {
  var xCoordinate = parseFloat(document.getElementById("henosis").getAttribute("cx"))+parseFloat(20);
  var yCoordinate = parseFloat(document.getElementById("henosis").getAttribute("cy"))+parseFloat(20);
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  if((xCoordinate>windowWidth)||(yCoordinate>windowHeight))
  {
    console.log(xCoordinate+" i am the one who is working! "+windowWidth);
    if(xCoordinate>windowWidth)
    {
      var leftPosition = (xCoordinate - (xCoordinate - windowWidth)-20);
      // update coordinates manually, since top/left style props don't work on SVG
      document.getElementById("henosis").setAttribute('cx', leftPosition);
      changeShadowOfSVGElement((windowWidth/2), (windowHeight/2), 1, 0.005, "henosis", "shadow");
    }
    else if(yCoordinate>windowHeight)
    {
      var topPosition = (yCoordinate - (yCoordinate - windowHeight)-20);
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
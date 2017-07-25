//changeShadowOfSVGElement(int x1, int y1, int z1, int z2, string element1Identifier, string element2Identifier);
//x1, y1, z1 - coordinates of the light source.
//z2 - plane of the screen.
//element1Identifier - ID of the first SVG element(object).
//element2Identifier - ID of the second SVG element(shadow).

function changeShadowOfSVGElement(x1, y1, z1, z2, element1Identifier, element2Identifier)
// function changeShadowOfSVGElement()
{

  //Get element1Type.
  var element1Type=document.getElementById(element1Identifier).tagName;

  //Get element2Type.
  var element2Type=document.getElementById(element2Identifier).tagName;

  //Check if both elements are of the same type.
  if(element1Type === element2Type)
  {

    if(element1Type === "circle")
    {

      //Get radius of object.
      var radiusObject = document.getElementById(element1Identifier).getAttribute("r");

      //Calculation of Shadow Radius.
      var radiusShadow = (radiusObject * ((z2+z1)/z1));

      //Radius of Shadow changed here.
      document.getElementById(element2Identifier).setAttribute("r", radiusShadow);

      //Get x coordinate of the object.
      var xObject = document.getElementById(element1Identifier).getAttribute("cx");

      //Calculate x coordinate of the shadow.
      var xShadow = (parseFloat(xObject) + ((xObject - x1) * (z2 / z1)));

      //x coordinate of shadow set here.
      document.getElementById(element2Identifier).setAttribute("cx", xShadow);

      //Get y coordinate of the object.
      var yObject = document.getElementById(element1Identifier).getAttribute("cy");

      //Calculate x coordinate of the shadow.
      var yShadow = (parseFloat(yObject) + ((yObject - y1) * (z2 / z1)));

      //x coordinate of shadow set here.
      document.getElementById(element2Identifier).setAttribute("cy", yShadow);

    }
    else
    {

      console.error("changeShadowOfSVGElement() :: Unsupported type of elements provided. Aborting operation. elementsType: "+element1Type+"; Feel free to support the project with new element types. https://github.com/jilvin/changeShadowOfSVGElement");

    }

  }
  else
  {

    console.error("changeShadowOfSVGElement() :: Different type of elements provided. Aborting operation. element1Type: "+element1Type+"; element2Type: "+element2Type+";");

  }

}
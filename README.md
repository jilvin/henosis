# henosis
Simple preloader.

See:

https://jilvin.github.io/henosis/

## Note
Remove or comment margin style definition from henosis.css if Bootstrap is used.

## Initialization

henosisInit(possibleContainersParameter, containerRotationModeParameter, cx, cy);

* possibleContainersParameter

  * Set the number of containers you would like to have in the website.

  * Values: INTEGER.

* containerRotationModeParameter

  * Set the mode of operation for container rotation below.

  * Values: "display", "visibility";

* cx

  * Set the initial cx coordinate for henosis.

  * Values: Range(20, (viewportWidth-20));

* cy

  * Set the initial cy coordinate for henosis.

  * Values: Range(20, (viewportHeight-20));

Do not forget to call this function. Else henosis won't work.

## Contribution
Contributions and suggestions are always welcome.

### Future plans
1) Make the containment of henosis more elegant.
2) Make the code more elegant.
3) Make it better responsive.
4) Boost up the performance.

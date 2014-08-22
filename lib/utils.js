(function() {

  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var Utils = Asteroids.Utils = {};

  Utils.inherits = function(ChildClass, ParentClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.constructor = ChildClass;
  };

  Utils.convertToCartesian = function(polarCoords) {
    var x = polarCoords[0] * Math.cos(polarCoords[1]);
    var y = polarCoords[0] * Math.sin(polarCoords[1]);

    return [x, y];
  };

  Utils.convertToPolar = function(cartesianCoords) {
    var radius = Math.sqrt(
      Math.pow(cartesianCoords[0], 2) + Math.pow(cartesianCoords[1], 2)
    );
    var angle = Math.atan(cartesianCoords[1] / cartesianCoords[0]);

    // The value of arctan depends on which quadrant the point lies on.
    if (cartesianCoords[0] < 0) {
      angle += Math.PI;
    } else if (cartesianCoords[0] > 0 && cartesianCoords[1] < 0) {
      angle += 2 * Math.PI;
    }

    return [radius, angle];
  };

  Utils.rotateAroundOrigin = function(point, direction, radians) {
    var polar = Utils.convertToPolar(point);

    if (direction === 'right') {
      polar[1] += radians;
    } else if (direction === 'left') {
      polar[1] -= radians;
    }

    return Utils.convertToCartesian(polar);
  };

  Utils.randomVector = function(magnitude) {
    // Choose a random x-coord around the origin. Then, choose the y-coord
    // such that the length is preserved given the x-coord. Finally, randomly
    // decide whether the y-coord is negative or positive.
    var randomX = Math.random() * magnitude * 2 - magnitude;
    var randomY = Math.sqrt(Math.pow(magnitude, 2) - Math.pow(randomX, 2));
    if (Math.random() < 0.5) { randomY *= -1; }

    return [randomX, randomY];
  };

  Utils.distance = function(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

})();



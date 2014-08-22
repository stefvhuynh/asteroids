(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var Asteroid = Asteroids.Asteroid = function(params) {
    Asteroids.MovingObject.call(this, params);
    
    this.velocity = Asteroid.randomVelocity();
    this.radius = Math.random() * Asteroid.RADIUS_RANGE + Asteroid.MIN_RADIUS;
    this.drawNodes = Asteroid.randomDrawNodes(
      this.radius, Asteroid.RADIUS_OFFSET, Asteroid.ROUNDEDNESS
    );
  };
  
  Asteroids.Utils.inherits(Asteroid, Asteroids.MovingObject);
  
  Asteroid.MAX_VELOCITY = 4;
  Asteroid.RADIUS_RANGE = 30;
  Asteroid.MIN_RADIUS = 10;
  Asteroid.RADIUS_OFFSET = 0;
  Asteroid.ROUNDEDNESS = Math.PI / 2;
  
  Asteroid.randomVelocity = function() {
    return Asteroids.Utils.randomVector(Math.random() * Asteroid.MAX_VELOCITY);
  };
  
  // The radius offset decides how far from the original radius, the
  // edges of the asteroid should be drawn. This feature is here so
  // that we can fine-tune collision detection, since we are only using
  // a simple detection technique involving circles. Roundedness takes
  // a value between 0 and 2 * pi. This determines the maximum length
  // of each edge (by determining the maximum change in radius).
  Asteroid.randomDrawNodes = function(radius, radiusOffset, roundedness) {
    var drawNodes = [];
    var radiansSoFar = 0;
    var offsetRadius = radius + radiusOffset;
    
    while (radiansSoFar < 2 * Math.PI) {
      var cartesianCoords = Asteroids.Utils.convertToCartesian(
        [offsetRadius, radiansSoFar]
      );
      
      drawNodes.push(cartesianCoords);
      radiansSoFar += Math.random() * roundedness;
    }
    
    return drawNodes;
  };
  
  Asteroid.prototype.collide = function() {
    Asteroids.MovingObject.prototype.collide.call(this);
  };
  
})();


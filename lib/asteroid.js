(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var Asteroid = Asteroids.Asteroid = function(params) {    
    params.radius = params.radius || Asteroid.randomRadius();
    params.velocity = params.velocity || Asteroid.randomVelocity();
    params.drawNodes = Asteroid.randomDrawNodes(
      params.radius, Asteroid.RADIUS_OFFSET, Asteroid.ROUNDEDNESS
    );
        
    Asteroids.MovingObject.call(this, params);
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
  
  Asteroid.randomRadius = function() {
    return Math.random() * Asteroid.RADIUS_RANGE + Asteroid.MIN_RADIUS;
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
    this.breakApart();
    Asteroids.MovingObject.prototype.collide.call(this);
  };
  
  Asteroid.prototype.breakApart = function() {
    // Only break apart if the smaller halves of the asteroid are not 
    // smaller than the minimum radius.
    if (this.radius / 2 > Asteroid.MIN_RADIUS) {
      var asteroidHalf1 = new Asteroid({
        position: [this.position[0], this.position[1]],
        game: this.game,
        radius: this.radius / 2
      });
      
      var asteroidHalf2 = new Asteroid({
        position: [this.position[0], this.position[1]],
        game: this.game,
        radius: this.radius / 2
      });
      
      this.game.addAsteroid(asteroidHalf1);
      this.game.addAsteroid(asteroidHalf2);
    }    
  };
  
})();


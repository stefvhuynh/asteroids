(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var Bullet = Asteroids.Bullet = function(params) {
    Asteroids.MovingObject.call(this, params);
    
    this.radius = Bullet.RADIUS;
    this.direction = params.direction;
    this.velocity = Asteroids.Utils.convertToCartesian(
      [Bullet.ABS_VELOCITY, this.direction]
    );
  };
  
  Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);
  
  Bullet.RADIUS = 0.5;
  Bullet.ABS_VELOCITY = 10;
  
  Bullet.prototype.draw = function(context) {
    context.beginPath();
    context.arc(
      this.position[0], this.position[1],
      this.radius, 0, 2 * Math.PI, true
    );
    
    context.stroke();
  };
  
})();
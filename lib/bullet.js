(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var Bullet = Asteroids.Bullet = function(params) {
    params.radius = Bullet.RADIUS;
    params.velocity = Asteroids.Utils.convertToCartesian(
      [Bullet.ABS_VELOCITY, params.direction]
    );
    
    Asteroids.MovingObject.call(this, params);
    
    this.direction = params.direction;
    this.setLifetime();
  };
  
  Asteroids.Utils.inherits(Bullet, Asteroids.MovingObject);
  
  Bullet.RADIUS = 0.5;
  Bullet.ABS_VELOCITY = 10;
  Bullet.LIFETIME = 700;
  
  Bullet.prototype.draw = function(context) {
    context.beginPath();
    context.arc(
      this.position[0], this.position[1],
      this.radius, 0, 2 * Math.PI, true
    );
    
    context.stroke();
  };
  
  
  Bullet.prototype.setLifetime = function() {
    var that = this;
    
    window.setTimeout(function() {
      that.game.removeObject(that);
    }, Bullet.LIFETIME);
  };
  
})();



(function() {

  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var Game = Asteroids.Game = function() {
    this.dim_x = Game.DIM_X;
    this.dim_y = Game.DIM_Y;
    this.asteroids = this.generateAsteroids();
    this.ship = new Asteroids.Ship({ game: this });
    this.bullets = [];
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.NUM_ASTEROIDS = 3;

  Game.prototype.allObjects = function() {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  };

  Game.prototype.draw = function(context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.allObjects().forEach(function(object) { object.draw(context); });
  };

  Game.prototype.moveObjects = function(context) {
    this.allObjects().forEach(function(object) { object.move(); });
  };
  
  Game.prototype.removeObject = function(object) {
    if (object instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
    }
  };

  Game.prototype.checkCollisions = function() {
    var that = this;
    
    this.asteroids.forEach(function(asteroid) {
      if (asteroid.hasCollidedWith(that.ship)) {
        that.ship.collide();
        asteroid.collide();
      }
      
      that.bullets.forEach(function(bullet) {
        if (asteroid.hasCollidedWith(bullet)) {
          asteroid.collide();
          bullet.collide();
        }
      });
    });
  };

  Game.prototype.wrap = function(position) {
    var newX = position[0];
    var newY = position[1];

    if (position[0] < 0 || position[0] > this.dim_x) {
      newX = Math.abs(position[0] - this.dim_x);
    }

    if (position[1] < 0 || position[1] > this.dim_y) {
      newY = Math.abs(position[1] - this.dim_y);
    }

    return [newX, newY];
  };

  Game.prototype.generateAsteroids = function() {
    var asteroids = [];

    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      var newAsteroid = new Asteroids.Asteroid({
        position: this.randomPosition(),
        game: this
      });

      asteroids.push(newAsteroid);
    }

    return asteroids;
  };
  
  Game.prototype.addAsteroid = function(asteroid) {
    this.asteroids.push(asteroid);
  };
  
  Game.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.randomPosition = function() {
    return [Math.random() * this.dim_x, Math.random() * this.dim_y];
  };

})();



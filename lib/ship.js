(function() {

  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(params) {
    Asteroids.MovingObject.call(this, params);

    this.position = [this.game.dim_x / 2, this.game.dim_y / 2];
    this.velocity = [0, 0];
    this.radius = Ship.RADIUS;
    this.drawNodes = Ship.DRAW_NODES;
    this.direction = Math.PI * 3 / 2;
  };

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);

  Ship.THRUST_POWER = 1;
  Ship.FRICTION = 0.01;
  Ship.RADIUS = 10;
  Ship.ROTATION = Math.PI / 10;
  Ship.DRAW_NODES = [
    [0, -Ship.RADIUS],
    [Ship.RADIUS - Ship.RADIUS / 10, Ship.RADIUS],
    [Ship.RADIUS / 10 - Ship.RADIUS, Ship.RADIUS]
  ];

  Ship.prototype.move = function() {
    Asteroids.MovingObject.prototype.move.call(this);
    this.velocity[0] *= (1 - Ship.FRICTION);
    this.velocity[1] *= (1 - Ship.FRICTION);
  };

  // The ship can only thrust forward. To change directions, it first needs
  // to rotate.
  Ship.prototype.thrust = function() {
    var velocityVector = Asteroids.Utils.convertToCartesian([
      Ship.THRUST_POWER, this.direction
    ]);

    this.velocity[0] += velocityVector[0];
    this.velocity[1] += velocityVector[1];
  };

  Ship.prototype.rotate = function(direction) {
    for (var i = 0; i < this.drawNodes.length; i++) {
      this.drawNodes[i] = Asteroids.Utils.rotateAroundOrigin(
        this.drawNodes[i], direction, Ship.ROTATION
      );
    }

    if (direction === 'right') {
      this.direction += Ship.ROTATION;
    } else if (direction === 'left') {
      this.direction -= Ship.ROTATION;
    }
  };

})();



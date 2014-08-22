(function() {

  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(params) {
    params.position = [params.game.dim_x / 2, params.game.dim_y / 2];
    params.velocity = [0, 0];
    params.radius = Ship.RADIUS;
    params.drawNodes = Ship.DRAW_NODES;
    
    Asteroids.MovingObject.call(this, params);
    
    this.direction = Math.PI * 3 / 2;
    this.tailDrawNodes = Ship.TAIL_DRAW_NODES;
  };

  Asteroids.Utils.inherits(Ship, Asteroids.MovingObject);
  
  Ship.RESPAWN_TIME = 2000;
  Ship.THRUST_POWER = 0.3;
  Ship.FRICTION = 0.01;
  Ship.RADIUS = 10;
  Ship.ROTATION = Math.PI / 20;
  Ship.DRAW_NODES = [
    [Ship.RADIUS - Ship.RADIUS / 10, Ship.RADIUS],
    [0, -Ship.RADIUS],
    [Ship.RADIUS / 10 - Ship.RADIUS, Ship.RADIUS]
  ];
  Ship.TAIL_DRAW_NODES = [
    [Ship.RADIUS - Ship.RADIUS / 2, Ship.RADIUS],
    [0, Ship.RADIUS * 2],
    [Ship.RADIUS / 2 - Ship.RADIUS, Ship.RADIUS]
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
    // Combine all draw nodes, iterate through them, then splice and 
    // reassign back to the original sets.
    var allDrawNodes = this.tailDrawNodes.concat(this.drawNodes);
    
    for (var i = 0; i < allDrawNodes.length; i++) {
      allDrawNodes[i] = Asteroids.Utils.rotateAroundOrigin(
        allDrawNodes[i], direction, Ship.ROTATION
      );
    }
    
    this.tailDrawNodes = allDrawNodes.splice(0, 3);
    this.drawNodes = allDrawNodes;
    
    // Update the ship's forward directional angle.
    if (direction === 'right') {
      this.direction += Ship.ROTATION;
    } else if (direction === 'left') {
      this.direction -= Ship.ROTATION;
    }
  };
  
  Ship.prototype.collide = function() {
    var that = this;
    // Hide the ship offscreen for the respawn time.
    this.position = [this.game.dim_x * 100, this.game.dim_y * 100];
    
    window.setTimeout(function() {
      that.resetPosition();
    }, Ship.RESPAWN_TIME);
  };
  
  Ship.prototype.resetPosition = function() {
    this.position = [this.game.dim_x / 2, this.game.dim_y / 2];
    this.velocity = [0, 0];
    if (this.drawNodes.length === 6) { this.undrawTail(); }
  };
  
  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({
      game: this.game,
      position: [this.position[0], this.position[1]], 
      direction: this.direction
    });
    
    this.game.addBullet(bullet);
  };
  
  // To draw the tail, we simply prepend three draw nodes to the ship's
  // original draw nodes. For this to work, the draw nodes need to be
  // arranged such that one would not need to lift up the drawing tool
  // to move to another position on the canvas.
  Ship.prototype.drawTail = function() {
    // Only add the extra tail draw nodes if they are not already added.
    if (this.drawNodes.length === 3) {
      this.drawNodes = this.tailDrawNodes.concat(this.drawNodes);
    }
  };
  
  Ship.prototype.undrawTail = function() {
    this.drawNodes.splice(0, 3);
  };
  
})();



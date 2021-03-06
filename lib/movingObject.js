(function() {

  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }

  var MovingObject = Asteroids.MovingObject = function(params) {
    this.position = params.position;
    this.velocity = params.velocity;
    this.radius = params.radius;
    // This is an array of points, centered around the origin, for
    // connecting the edges of a shape.
    this.drawNodes = params.drawNodes;
    this.game = params.game;
  };

  // This function depends on the fact that the nodes are arranged in such
  // a way so that one would not need to lift their pen on the canvas to
  // draw the shape.
  MovingObject.prototype.draw = function(context) {
    context.beginPath();
    context.moveTo(
      // By shifting according to the position here, the draw nodes can
      // remain static.
      this.position[0] + this.drawNodes[0][0],
      this.position[1] + this.drawNodes[0][1]
    );

    for (var i = 1; i < this.drawNodes.length; i++) {
      context.lineTo(
        this.position[0] + this.drawNodes[i][0],
        this.position[1] + this.drawNodes[i][1]
      );
    }

    // Connect the last node to the first node.
    context.lineTo(
      this.position[0] + this.drawNodes[0][0],
      this.position[1] + this.drawNodes[0][1]
    );

    context.stroke();
  };

  MovingObject.prototype.move = function() {
    var newPosition = this.game.wrap([
      this.position[0] + this.velocity[0],
      this.position[1] + this.velocity[1]
    ]);

    this.position[0] = newPosition[0];
    this.position[1] = newPosition[1];
  };
  
  // Just use circles for collision detection.
  MovingObject.prototype.hasCollidedWith = function(otherObject) {
    var distanceBetweenCenters = Asteroids.Utils.distance(
      this.position, otherObject.position
    );

    if (distanceBetweenCenters < (this.radius + otherObject.radius)) {
      return true;
    } else {
      return false;
    }
  };
  
  MovingObject.prototype.collide = function() {
    this.game.removeObject(this);
  };

})();




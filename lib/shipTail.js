(function() {
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var ShipTail = Asteroids.ShipTail = function(params) {
    params.position = params.ship.position;
    params.radius = 0;
    params.velocity = params.ship.velocity;
    params.game = params.ship.game;
    params.drawNodes = this.drawNodes(params.ship);
    
    Asteroids.MovingObject.call(this, params);
    this.ship = params.ship;
    this.direction = this.ship.direction;
  };
  
  Asteroids.Utils.inherits(ShipTail, Asteroids.MovingObject);
  
  ShipTail.prototype.drawNodes = function(ship) {
    return [
      [0, ship.radius + ship.radius / 2],
      [ship.radius - ship.radius / 5, ship.radius],
      [ship.radius / 5 - ship.radius, ship.radius]
    ];
  };
  
})();
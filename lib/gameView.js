(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var GameView = Asteroids.GameView = function(game, context) {
    this.game = game;
    this.context = context;
  };
  
  GameView.prototype.start = function() {
    var that = this;
    this.bindKeys();
    
    window.setInterval(function() {
      that.game.draw(context);
      that.game.moveObjects(context);
    }, 25);
  };
  
  GameView.prototype.bindKeys = function() {
    var that = this;
    
    $(document).on('keydown', function(event) {
      switch(event.keyCode) {
        case 38:
          that.game.ship.thrust();
          break;
        case 39:
          that.game.ship.rotate('right');
          break;
        case 37:
          that.game.ship.rotate('left');
          break;
      }
    });
  };
  
})();



(function() {
  
  if (typeof Asteroids === 'undefined') { window.Asteroids = {}; }
  
  var GameView = Asteroids.GameView = function(game, context) {
    this.game = game;
    this.context = context;
    this.keysState = {};
  };
  
  GameView.prototype.start = function() {
    var that = this;
    
    this.trackKeys();
    this.bindSpacebar();
    
    window.setInterval(function() {
      that.step();
      that.keyActions();
    }, 25);
  };
  
  GameView.prototype.step = function() {
    this.game.draw(this.context);
    this.game.moveObjects(this.context);
    this.game.checkCollisions();
  };
  
  GameView.prototype.trackKeys = function() {
    var that = this;
    
    $(document).on('keydown', function(event) {
      that.keysState[event.keyCode] = true;
    }).on('keyup', function(event) {
      that.keysState[event.keyCode] = false;
    });
  };
  
  GameView.prototype.keyActions = function() {    
    if (this.keysState[38]) {
      this.game.ship.thrust();
      this.game.ship.drawTail(this.context);
    } else if (this.keysState[39]) {
      this.game.ship.rotate('right');
    } else if (this.keysState[37]) {
      this.game.ship.rotate('left');
    }
  };
  
  GameView.prototype.bindSpacebar = function() {
    var that = this;
    
    $(document).on('keydown', function(event) {
      if (event.keyCode === 32) { that.game.ship.fireBullet(); }
    });
  };
  
})();



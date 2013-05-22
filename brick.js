(function(){

  var root = this,
      previousBrick = root.Brick || {};


  var Brick = root.Brick = function(options) {

    noConflict: function() {
      root.Brick = previousBrick;
      return this;
    }

  };

})();

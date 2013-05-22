(function(){

  'use strict';

  var root = this,
      previousBrick = root.Brick || {},
      Brick;


  Brick = root.Brick = function(options) {

  };


  Brick.noConflict = function() {
    root.Brick = previousBrick;
    return this;
  };


})();

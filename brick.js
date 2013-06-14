var root = this;

(function($){

  'use strict';

  console.log('|__Brick__|');



  var previousBrick = root.Brick || {},
      Brick;


  Brick = root.Brick = function(options) {

  };


  Brick.noConflict = function() {
    root.Brick = previousBrick;
    return this;
  };


})(jQuery);

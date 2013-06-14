// (function() {

  var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      PI_2 = Math.PI * 2,
      RADIUS = 20,
      NUM_CONFETTI = 100,
      SPEED = 7,
      wCenter,
      hCenter;

  window.w = window.innerWidth;
  window.h = window.innerHeight;

  function resizeWindow() {
    window.w = canvas.width = window.innerWidth;
    window.h = canvas.height = window.innerHeight;

    wCenter = (window.w - RADIUS) / 2;
    hCenter = (window.h - RADIUS) / 2;

    start();
  }

  window.addEventListener('resize', resizeWindow, false);

  window.onload = function() {
    setTimeout(resizeWindow, 0);
  }

  function Confetti(options) {
    options = options || {};

    this.colors = [
      '233,97,213',   // pink
      '233,75,53',    // red
      '253,231,52',   // yellow
      '26,175,92'     // green
    ];

    this.rgb = options.rgb || this.randomColor();
    this.a = options.a || this.randomAlpha();
    this.r = options.r || this.randomRadius();
    this.x = options.x || wCenter;
    this.y = options.y || hCenter;
    this.vy = function(){
      if (this.r < 22) {
        return SPEED - 3;
      } else if (this.r < 26) {
        return SPEED - 2;
      } else if (this.r < 30) {
        return SPEED - 1;
      } else {
        return SPEED;
      }
    };

    this.draw();
  }

  Confetti.prototype.draw = function() {
    this.move();
    this.checkBounds();

    drawConfetti(
      this.x,
      this.y,
      this.r,
      this.rgb,
      this.a
    );
  };

  Confetti.prototype.move = function() {
    this.y += (this.vy());
  };

  Confetti.prototype.reset = function() {
    this.y = -50;
  };

  Confetti.prototype.checkBounds = function() {
    if ((this.y-this.r) > window.h || (this.x-this.r) > window.w) {
      this.reset();
      return;
    };
  };

  Confetti.prototype.randomColor = function() {
    return this.colors[_.random(this.colors.length)];
  };

  Confetti.prototype.randomRadius = function() {
    return _.random(18,32);
  };

  Confetti.prototype.randomAlpha = function() {
    return _.random(0.9, 1)
  };


  function drawConfetti(x, y, r, style, a) {
    drawTop(x,y,r,style, a);
    drawBottom(x,y,r,style, a);
  }

  function drawTop(x,y,r,style,a) {
    drawCircle(x,y,r,style, true, a);
  }

  function drawBottom(x,y,r,style,a) {
    drawCircle(x,y,r,style,false, a-0.25);
  }

  function drawCircle(x,y,r,style, isCCW, opacity) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI, isCCW);
    context.fillStyle = 'rgba('+style+','+opacity+')';
    context.fill();
  }

  function step() {
    requestAnimationFrame(step);
    context.clearRect(0,0,window.w,window.h);
    for (var i = 0; i < NUM_CONFETTI; i++) {
      confetti[i].draw();
    }
  }

  function start() {
    window.c = new Confetti();
    window.confetti = [];
    for (var i = 0; i < NUM_CONFETTI; i++) {
      confetti.push(new Confetti({
        y: (function(){
          return (-10 - (Math.random()*window.h));
        })(),
        x: (function(){
          return 15 + (Math.random()*window.w);
        })()
      }));
    }
    step();
  }

// })();

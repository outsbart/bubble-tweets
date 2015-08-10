/**
 * 'Game' logic
 */

(function(settings) {
  var canvas = document.getElementById('myCanvas');

  function makeCanvasFullPage() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
  }

  window.onresize = makeCanvasFullPage;

  makeCanvasFullPage();

  var context = canvas.getContext('2d');

  function centerX() {
    return canvas.width / 2;
  }

  function centerY() {
    return canvas.height / 2;
  }

  var balls = [], hashtagBalls = {};

  function getHashtagBall(hashtag) {
    var hashtagBall = hashtagBalls[hashtag];

    if (!hashtagBall) {
      var num_hashtags = Object.keys(hashtagBalls).length,
        color = settings.BALL_COLORS[num_hashtags % settings.BALL_COLORS.length];

      hashtagBall = hashtagBalls[hashtag] = new Ball(color, centerX(), centerY(), hashtag);
      changeHashtagBallsDestination();
    }

    return hashtagBall;
  }

  function getHashtagBalls() {
    return Object.keys(hashtagBalls).map(function (key) {
      return hashtagBalls[key];
    });
  }

  function changeHashtagBallsDestination() {
    /**
     * Spread HashtagBalls over an oval shape
     */
    var hashtags = getHashtagBalls(),
      num = hashtags.length;

    hashtags.forEach(function (hashtagBall, index) {
      hashtagBall.destination = new Vector2D(
        centerX() + Math.cos(index / num * Math.PI * 2) * centerX() / 1.5,
        centerY() + Math.sin(index / num * Math.PI * 2) * centerY() / 1.5
      );
    });

  }

  function spawnBall(hashtag) {
    var hashtagBall = getHashtagBall(hashtag);
    balls.push(new Ball(hashtagBall.color, centerX(), centerY(), hashtagBall));
  }

  function loop() {
    loopBody();

    window.requestAnimationFrame(loop);
  }

  function loopBody() {
    /*
        The actual loop.
        Some optimization could be performed,
        but let's keep it simple.
     */

    var hashtagBalls = getHashtagBalls();

    // calculate balls' next position
    balls = balls.filter(function (ball) {
      return ball.move();
    });
    hashtagBalls.forEach(function (ball) {
      ball.move();
    });

    // draw them!
    context.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
      ball.draw(context);
    });
    hashtagBalls.forEach(function (ball) {
      ball.draw(context);
    });
  }

  loop();

  /*
    Expose functions that need to be called outside using reveal pattern
   */
  window.Game =  {
    spawnBall: spawnBall
  };
})(t2bsettings);
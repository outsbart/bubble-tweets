/**
 * The ball class.
 * Vector2D is in the prototype chain, so that vector operation are available.
 */

function Ball(color, x, y, destination) {
  Vector2D.call(this, x, y);
  this.color = color;
  this.speed = 5;
  this.weight = 1;
  this.text = destination || '';
  this.destination = destination;
}

Ball.prototype = new Vector2D();

Ball.prototype.move = function () {

  // if ball has no destination
  if (!this.destination) {
    // nothing to do here
    return true;
  }

  var vect = this.destination.minus(this);

  // last movement
  if (vect.length() < this.speed) {
    if (this.destination.touch) this.destination.touch();
    this.destination = null;
    return false;
  }

  vect.normalize();
  vect.scale(this.speed);

  this.add(vect);

  return true;
};

Ball.prototype.draw = function (context) {
  context.beginPath();
  context.arc(this.x, this.y, this.weight + 10, 0, 2 * Math.PI, false);
  context.fillStyle = this.color;
  context.fill();
  context.font="20px Georgia";
  context.fillStyle = 'black';
  context.fillText(this.text, this.x - this.text.length/2 * 9, this.y + this.weight + 10 + 23);
  context.lineWidth = 3;
  context.strokeStyle = '#003300';
  context.stroke();
};

Ball.prototype.touch = function () {
  this.weight++;
};

Ball.prototype.constructor = Ball;
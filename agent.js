const random = require('canvas-sketch-util/random');

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(25, 50);
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height) {
    if (this.pos.x - this.radius < 0 || this.pos.x + this.radius > width) this.vel.x *= -1;
    if (this.pos.y - this.radius < 0 || this.pos.y + this.radius > height) this.vel.y *= -1;
  }

  wrap(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.pos.x = width - this.pos.x;
    if (this.pos.y <= 0 || this.pos.y >= height) this.pos.y = width - this.pos.y;
  }

  draw(ctx) {
    ctx.strokeStyle = '#fff';

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);

    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
}

export { Agent };

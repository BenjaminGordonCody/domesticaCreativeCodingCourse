const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = () => {
  //define agents
  let agents = [];
  for (let i = 0; i < 100; i++) {
    agents[i] = new Agent(
      settings.dimensions[0] * Math.random(),
      settings.dimensions[1] * Math.random(),
      30 * Math.random()
    );
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //lines between agents
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];
        const dist = agent.pos.getDist(other.pos);
        if (dist < 100) {
          context.save();
          context.lineWidth = math.mapRange(dist, 0, 100, 12, 1);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
          context.restore();
        }
      }
    }
    //agent movement
    agents.forEach((agent) => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDist(vector) {
    const dx = this.x - vector.x;
    const dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, radius) {
    this.pos = new Vector(x, y);
    this.radius = radius;
    this.velocity = new Vector(random.range(-2, 2), random.range(-2, 2));
  }
  draw(context) {
    this.context = context;

    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.velocity.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.velocity.y *= -1;
    }
  }
  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
}

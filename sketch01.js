const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { Agent } from './agent';

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const sketch = ({ width, height }) => {
  const agents = [];

  for (let i = 0; i < 40; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);
    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    const ctx = context;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];

      for (let j = 0 + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        ctx.lineWidth = math.mapRange(dist, 0, 200, 12, 1);
        ctx.strokeStyle = '#fff';

        ctx.beginPath();
        ctx.moveTo(agent.pos.x, agent.pos.y);
        ctx.lineTo(other.pos.x, other.pos.y);
        ctx.stroke();
      }
    }

    agents.forEach((agent, index) => {
      agent.update();
      agent.draw(ctx);

      index % 2 == 0 ? agent.bounce(width, height) : agent.wrap(width, height);
    });
  };
};

canvasSketch(sketch, settings);

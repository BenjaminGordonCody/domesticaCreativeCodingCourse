const canvasSketch = require("canvas-sketch");
const Color = require("canvas-sketch-util/color");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 12,
  playbackRate: "throttle",
};

const degToRad = (degrees) => {
  return (degrees / 180) * Math.PI;
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "rgb(255,200,255)";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = width * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 23;
    const radius = width * 0.3;
    let x, y;

    for (let i = 0; i < num; i++) {
      //find place around circumference
      const slice = degToRad(360 / num);
      const angle = slice * i;
      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      //define fill style
      const grd = context.createLinearGradient(
        0,
        0,
        width * Math.random(),
        height * Math.random()
      );
      grd.addColorStop(
        0,
        `rgba(
         ${random.range(1, 255)},
         ${random.range(1, 255)},
         ${random.range(1, 255)}, ${Math.random()})`
      );
      grd.addColorStop(
        1,
        `rgba(
         ${random.range(1, 255)},
         ${random.range(1, 255)},
         ${random.range(1, 255)}, ${Math.random()})`
      );
      context.fillStyle = grd;
      context.strokeStyle = grd;

      //draw spokes
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(1, 3), randomRange(1, 3));
      context.beginPath();
      context.rect(-w * 0.5, randomRange(0, -h * 0.5), w, h);
      context.restore();
      context.fill();

      //arcs
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);
      context.beginPath();
      context.lineWidth = randomRange(10, 40);
      context.arc(
        0,
        0,
        radius * randomRange(0.5, 2),
        slice * -0.3,
        slice * 0.3
      );
      context.stroke();
      context.restore();
    }
  };
};
canvasSketch(sketch, settings);

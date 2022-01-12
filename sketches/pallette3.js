const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const Pallette = require("../Pallette");

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
  //define pallette
  pallette = new Pallette.ColorSquare(
    [0, 0, 0],
    [255, 0, 255],
    [255, 255, 255],
    [255, 255, 100],
    15
  );
  return ({ context, width, height }) => {
    context.fillStyle = "black";
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
      console.log(pallette.random());
      context.fillStyle = `rgb(${pallette.random()})`;
      context.strokeStyle = `rgb(${pallette.random()})`;

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

const canvasSketch = require("canvas-sketch");
const Pallette = require("../Pallette");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const steps = 5;
    const swatchHeight = height / steps;
    const swatchWidth = width / steps;

    const pallette = new Pallette.ColorSquare(
      [100, 0, 0],
      [0, 100, 255],
      [0, 255, 100],
      [255, 255, 255],
      steps
    );
    for (let rows = 0; rows < steps; rows++) {
      for (let cols = 0; cols < steps; cols++) {
        console.log(pallette.table);
        context.fillStyle = `rgb(${pallette.table[rows][cols]})`;
        context.fillRect(
          swatchWidth * cols,
          swatchHeight * rows,
          swatchWidth,
          swatchHeight
        );
      }
    }
  };
};

canvasSketch(sketch, settings);

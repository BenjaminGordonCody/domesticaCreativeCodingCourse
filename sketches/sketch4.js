const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //define measurements
    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;

    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    // neater way to define grid
    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      //co-ords
      const x = col * cellw;
      const y = row * cellh;

      //noise
      const n = random.noise2D(x, y, 0.001);
      const angle = n * Math.PI;

      //line def
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      //drawing
      context.save();
      context.translate(x, y); //cell location
      context.translate(margx, margy); //accomodate margin
      context.translate(cellw * 0.5, cellh * 0.5); //move to center of cell
      context.rotate(angle); //adding noise
      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);

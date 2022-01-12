const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const Pallette = require("../Pallette");
const tweakpane = require("tweakpane");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [500, 500],
  animate: true,
  fps: 60,
  playbackRate: "throttle",
};

const params = {
  size: 10,
  scaleMin: 1,
  scaleMax: 30,
};
const sketch = () => {
  return ({ context, width, height, frame }) => {
    //define colour context
    const colours = new Pallette.ColorSquare(
      [0, 0, 0],
      [125, 125, 0],
      [0, 255, 240],
      [255, 255, 255],
      params.size
    );

    //background colour
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    //link params to params object
    const cols = params.size;
    const rows = cols;
    const numCells = cols * rows;

    //measurements from params
    const gridw = width * 1; //0.8;
    const gridh = height * 1; // 0.8;

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

      //noise and reatonship to line angle
      const n = random.noise2D(x + frame * 10, y + frame * 10, 0.001);
      const angle = n * Math.PI * 0.2;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      //line def
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      //drawing
      context.save();
      context.strokeStyle = `rgb(${colours.table[row][col]})`;
      context.lineWidth = scale;
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

const createpane = () => {
  const pane = new tweakpane.Pane();
  let folder;
  folder = pane.addFolder({ title: "grid" });
  folder.addInput(params, "size", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });
};

createpane();
canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const Pallette = require("../Pallette");
const tweakpane = require("tweakpane");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 24,
  playbackRate: "throttle",
};

const params = {
  //size/dynamics /
  size: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,

  //bg col
  bgR: 0,
  bgB: 0,
  bgG: 0,

  //colours at each corner
  r1: 255,
  b1: 255,
  g1: 255,

  r2: 255,
  b2: 255,
  g2: 255,

  r3: 255,
  b3: 255,
  g3: 255,

  r4: 255,
  b4: 255,
  g4: 255,
};
const sketch = () => {
  return ({ context, width, height, frame }) => {
    //define colour context
    const colours = new Pallette.ColorSquare(
      [params.r1, params.g1, params.b1],
      [params.r2, params.g2, params.b2],
      [params.r3, params.g3, params.b3],
      [params.r4, params.g4, params.b4],
      params.size
    );

    //background colour
    context.fillStyle = `rgb(${params.bgR},${params.bgB},${params.bgG})`;
    context.fillRect(0, 0, width, height);

    //link params to params object
    const cols = params.size;
    const rows = cols;
    const numCells = cols * rows;

    //measurements from params
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

      //noise and reatonship to line angle
      const n = random.noise2D(x + frame * 10, y + frame * 10, params.freq);
      const angle = n * Math.PI * params.amp;
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
      context.lineWidth = Math.abs(angle) + 0.001;

      context.beginPath();

      context.arc(0, 0, scale, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }
  };
};

const createpane = () => {
  const pane = new tweakpane.Pane({ title: "Parameters" });
  let folder;
  folder = pane.addFolder({ title: "grid" });
  folder.addInput(params, "size", { min: 2, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01, step: 0.001 });
  folder.addInput(params, "amp", { min: -0, max: 1, step: 0.01 });

  folder = pane.addFolder({ title: "bg color" });
  folder.addInput(params, "bgR", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "bgB", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "bgG", { min: 0, max: 255, step: 1 });

  folder = pane.addFolder({ title: "color1" });
  folder.addInput(params, "r1", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "b1", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "g1", { min: 0, max: 255, step: 1 });

  folder = pane.addFolder({ title: "color2" });
  folder.addInput(params, "r2", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "b2", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "g2", { min: 0, max: 255, step: 1 });

  folder = pane.addFolder({ title: "color3" });
  folder.addInput(params, "r3", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "b3", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "g3", { min: 0, max: 255, step: 1 });

  folder = pane.addFolder({ title: "color4" });
  folder.addInput(params, "r4", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "b4", { min: 0, max: 255, step: 1 });
  folder.addInput(params, "g4", { min: 0, max: 255, step: 1 });
};

createpane();
canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");
const colour = require("../Pallette");

const settings = {
  dimensions: [600, 60],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const divisions = 5;

    //get gradient of colours
    const colors = colour.get1dGradientArray(
      [0, 0, 0],
      [10, 255, 255],
      divisions
    );

    //for each division:
    for (let i = 0; i < divisions; i++) {
      context.fillStyle = `rgb(${colors[i][0]},${colors[i][1]},${colors[i][2]})`;
      let x = (width / divisions) * i;
      let y = 0;

      //draw square
      context.beginPath();
      context.rect(x, y, width / divisions, height);
      context.fill();
    }
  };
};

canvasSketch(sketch, settings);

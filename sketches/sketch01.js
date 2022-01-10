const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    let initialPadding = width * 0.03;
    let sqrWidth = width * 0.1;
    let sqrHeight = height * 0.1;
    let gap = width * 0.03;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let x = initialPadding + (sqrWidth + gap) * i;
        let y = initialPadding + (sqrHeight + gap) * j;

        console.log(x, y);
        context.beginPath();
        context.rect(x, y, sqrWidth, sqrHeight);
        context.stroke();

        if (Math.random() < 0.5) {
          context.beginPath();
          context.rect(x + 5, y + 5, sqrWidth - 10, sqrHeight - 10);
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);

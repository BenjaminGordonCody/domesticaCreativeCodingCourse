const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
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

        context.beginPath();
        context.rect(x, y, sqrWidth, sqrHeight);
        context.stroke();

        if (Math.random() < 0.5) {
          context.save();
          context.rotate(5);
          const smallSqrOffset = random.range(5, 20);
          context.beginPath();
          context.rect(
            x + smallSqrOffset,
            y + smallSqrOffset,
            sqrWidth - smallSqrOffset * 2,
            sqrHeight - smallSqrOffset * 2
          );
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);

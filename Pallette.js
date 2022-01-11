const getSpacedArrayOfIntsBetween = (num1, num2, steps) => {
  const array = [];
  array[0] = num1;
  array[steps - 1] = num2;
  const totalDifference = num2 - num1;
  const spaceBetweenSteps = totalDifference / steps;
  for (let i = 1; i < array.length - 1; i++) {
    array[i] = num1 + Math.round(i * spaceBetweenSteps);
  }
  return array;
};

/*
returns an array of RGB colours spaced evenly between two reference colours 
*/
const get1dGradientArray = (rgbA, rgbB, steps) => {
  //empty 2d array
  let gradientArray = [];
  for (let i = 0; i < steps; i++) {
    gradientArray[i] = [];
  }

  //for each of r,g and b
  for (let i = 0; i < 3; i++) {
    const value = getSpacedArrayOfIntsBetween(rgbA[i], rgbB[i], steps);

    //for each color-step between two shades
    for (let j = 0; j < value.length; j++) {
      gradientArray[j][i] = value[j];
    }
  }
  return gradientArray;
};

/*
This object takes 4 rgb colour strings and generates the intermediate shades 
between them. These shades can be returned as a full list, or as single random 
shades.
*/

class ColorSquare {
  constructor(rgb1, rgb2, rgb3, rgb4, stepsBetweenCorners) {
    //interpret corners of square
    const corners = [rgb1, rgb2, rgb3, rgb4];
    for (let i = 0; i < corners.length; i++) {
      const color = corners[i].split(",");
      for (let j = 0; j < color.length; j++) {
        color[j] = parseInt(color[j]);
      }
    }
  }
}

const sample = new ColorSquare(
  "255,255,255",
  "255,255,255",
  "255,255,255",
  "255,255,255"
);

const gradientArray = get1dGradientArray([0, 0, 0], [100, 200, 255], 20);
console.log(gradientArray);

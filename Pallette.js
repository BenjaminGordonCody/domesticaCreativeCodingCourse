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
  constructor(rgb1, rgb2, rgb3, rgb4, steps) {
    //make array
    const colorArray = [];
    for (let i = 0; i < steps; i++) {
      colorArray[i] = [];
      for (let j = 0; j < steps; j++) {
        colorArray[i][j] = [];
      }
    }
    //top and bottom rows
    colorArray[0] = get1dGradientArray(rgb1, rgb2, steps);
    colorArray[steps - 1] = get1dGradientArray(rgb3, rgb4, steps);

    // cols
    for (let col = 0; col < steps; col++) {
      const linearGradient = get1dGradientArray(
        colorArray[0][col],
        colorArray[steps - 1][col],
        steps
      );

      for (let row = 0; row < steps; row++) {
        colorArray[row][col] = linearGradient[row].join(); //
      }
    }
    this.table = colorArray;
  }

  random() {
    let col = Math.round(Math.random() * (this.table.length - 1));
    let row = Math.round(Math.random() * (this.table.length - 1));
    return this.table[row][col];
  }
}

module.exports = {
  getSpacedArrayOfIntsBetween,
  get1dGradientArray,
  ColorSquare,
};

//test
const sample = new ColorSquare(
  [1, 1, 1],
  [22, 22, 22],
  [33, 33, 33],
  [44, 44, 44],
  5
);
console.table(sample.table);
console.log(sample.random());

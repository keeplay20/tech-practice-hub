function transposeMatrix(inputMatrix) {
  const numRows = inputMatrix.length;
  const numCols = inputMatrix[0].length;

  let result = [];

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j][i] = inputMatrix[i][j];
    }
  }
  return result;
}

const inputMatrix = [
  [12, 13, 2],
  [4, 5, 6],
];

console.log(transposeMatrix(inputMatrix));

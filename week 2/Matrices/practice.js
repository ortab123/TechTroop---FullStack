//Spot check

const matrix = [];
const dimensions = 5;
let counter = 0;

for (let r = 0; r < dimensions; r++) {
  const row = [];
  for (let c = 0; c < dimensions; c++) {
    row.push(counter++);
  }
  matrix.push(row);
}

console.log(matrix);

const get = (rowNum, colNum) => {
  return matrix[rowNum][colNum];
};

console.log(get(1, 2));

const print = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let line = "";
    for (let j = 0; j < matrix[i].length; j++) {
      line += matrix[i][j] + "\t";
    }
    console.log(line);
  }
};

print(matrix);

function printRow(matrix, rowNum) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[rowNum][i]);
  }
}

printRow(matrix, 1);

//--------------------------------

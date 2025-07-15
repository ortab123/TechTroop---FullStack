const calculator = require("./calculator");

const args = process.argv;
const num1 = Number(args[2]);
const operator = args[3];
const num2 = Number(args[4]);

if (isNaN(num1) || isNaN(num2)) {
  console.log("Please provide valid numbers.");
  process.exit();
}

const result = calculator(num1, operator, num2);
console.log(`# Output: ${result}`);

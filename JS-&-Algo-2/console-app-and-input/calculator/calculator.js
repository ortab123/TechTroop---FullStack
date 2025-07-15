function calculator(num1, operator, num2) {
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        return "Can't divide by 0!";
      }
      result = num1 / num2;
      break;
    default:
      return "Invalid operator";
  }

  return `${num1} ${operator} ${num2} = ${result}`;
}

module.exports = calculator;

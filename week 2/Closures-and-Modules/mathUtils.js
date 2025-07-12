const mathOperations = function () {
  const add = function (x, y) {
    return x + y;
  };

  const subtract = function (x, y) {
    return x - y;
  };

  const multiply = function (x, y) {
    return x * y;
  };

  const divide = function (x, y) {
    if (y === 0) throw new Error("Cannot divide by zero");
    return x / y;
  };

  return {
    add: add,
    sub: subtract,
    mult: multiply,
    div: divide,
  };
};

export default mathOperations;

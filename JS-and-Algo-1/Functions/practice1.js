//Ex1
const isEven = function (number) {
  if (number % 2 === 0) {
    return true;
  } else {
    return false;
  }
};

//Ex2

const printOdd = function (arr) {
  for (let num of arr) {
    if (!isEven(num)) {
      console.log(num);
    }
  }
};

arr = [2, 6, 33, 17, 14, 67];
printOdd(arr);

//Ex3
const isExist = function (arr, number) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === number) {
      return true;
    }
  }
  return false;
};

arr = [1, 2, 3];
console.log(isExist(arr, 2));
console.log(isExist(arr, 5));

//Ex4
const calculator = {
  add: function (x, y) {
    return x + y;
  },
  subtract: function (x, y) {
    return x - y;
  },
};

const result1 = calculator.add(20, 1);
const result2 = calculator.subtract(30, 9);

console.log(calculator.add(result1, result2));

//Ex5
const increaseByNameLength = function (money, name) {
  return money * name.length;
};

const makeRegal = function (name) {
  return "His Royal Highness, " + name;
};

const turnToKing = function (name, money) {
  name = name.toUpperCase();
  money = increaseByNameLength(money, name);
  name = makeRegal(name);

  console.log(name + " has " + money + " gold coins");
};

turnToKing("martin luther", 100);

//Ex6
const threeDigitAmstrongNum = function () {
  for (let num = 100; num < 1000; num++) {
    const hundreds = Math.floor(num / 100);
    const tens = Math.floor((num % 100) / 10);
    const units = num % 10;

    const sum = hundreds ** 3 + tens ** 3 + units ** 3;
    if (sum === num) {
      console.log(num);
    }
  }
};

threeDigitAmstrongNum();

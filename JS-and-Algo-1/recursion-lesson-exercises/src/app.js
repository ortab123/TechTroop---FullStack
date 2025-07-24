/*
  Write your code in the corresponding method
  Please note: You must also add the correct arguments to the methods
*/

//Exercise 1
const findFactorial = function (num, factorical = 1) {
  if (num === 0) {
    return factorical;
  }
  factorical *= num;
  return findFactorial(num - 1, factorical);
};

//Exercise 2
const reverseString = function (str) {
  if (str === "") {
    return "";
  }
  return reverseString(str.slice(1)) + str[0];
};

//Exercise 3
const arr1 = [1, 2, 3];
const arr2 = [];

const swapA = function (arr1, arr2) {
  if (arr1.length === 0) {
    return;
  }

  arr2.push(arr1[0]);
  arr1.splice(0, 1);
  return swapA(arr1, arr2);
};

//Extension
const stack1 = [1, 2, 3];
const stack2 = [];

const swapS = function (stack1, stack2) {
  if (stack1.length === 0) {
    return;
  }

  const topElement = stack1.pop();
  swapS(stack1, stack2);
  stack2.push(topElement);
};

console.log(findFactorial(5));
console.log(findFactorial(8));
console.log(findFactorial(20));

console.log(reverseString("How u doin'?"));

swapA(arr1, arr2);
console.log(arr1);
console.log(arr2);

swapS(stack1, stack2);
console.log(stack1);
console.log(stack2);

/* DO NOT REMOVE THE EXPORTS BELOW */
module.exports = { findFactorial, reverseString, swapA, swapS };

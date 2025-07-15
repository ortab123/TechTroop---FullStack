//printDup Naive
const printDupsNaive = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        console.log(arr[i]);
        break;
      }
    }
  }
};

//printDup Soorted
const printDupsSorted = (arr) => {
  const sortedArr = [...arr].sort();

  for (let i = 1; i < sortedArr.length; i++) {
    if (
      sortedArr[i] === sortedArr[i - 1] &&
      sortedArr[i] !== sortedArr[i - 2]
    ) {
      console.log(sortedArr[i]);
    }
  }
};

//printDup Map
const printDupsMap = (arr) => {
  const arrMaped = new Map();

  for (let item of arr) {
    if (arrMaped.has(item)) {
      arrMaped.set(item, arrMaped.get(item) + 1);
    } else {
      arrMaped.set(item, 1);
    }
  }

  for (let [key, value] of arrMaped.entries()) {
    if (value > 1) {
      console.log(key);
    }
  }
};

printDupsMap(["a", "b", "a", "c", "b", "d", "e", "e"]);

//twoSum Naive
const twoSum = (number, target) => {
  for (let i = 0; i < number.length; i++) {
    for (let j = i + 1; j < number.length; j++) {
      if (number[i] + number[j] === target) {
        return true;
      }
    }
  }
  return false;
};

const number = [2, 7, 11, 15];
const target = 17;
console.log(twoSum(number, target));

//twoSum Sorted
const twoSumSorted = (numbers, target) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) {
      return true;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return false;
};

const number1 = [2, 7, 11, 15];
const target1 = 16;
console.log(twoSumSorted(number1, target1));

//twoSum Set
const twoSumSet = (numbers, target) => {
  const seen = new Set();

  for (let num of numbers) {
    const complement = target - num;
    if (seen.has(complement)) {
      return true;
    }
    seen.add(num);
  }

  return false;
};

const number2 = [2, 7, 11, 15];
const target2 = 17;
console.log(twoSumSet(number2, target2));

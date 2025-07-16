class Exercises {
  isEven(n) {
    if (typeof n !== "number") {
      throw new TypeError("Input must be a number");
    }
    return n % 2 == 0 ? true : false;
  }

  removeAtLeastOne(arr) {
    let numItemsToRemove = Math.floor(Math.random() * (arr.length - 1)) + 1;
    arr.splice(0, numItemsToRemove);
    return arr;
  }

  simplify(str) {
    let symbols = ["!", "#", ".", ",", "'"];
    return str
      .split("")
      .filter((c) => symbols.indexOf(c) == -1)
      .join("");
  }

  validate(arr) {
    if (!Array.isArray(arr)) {
      return { error: "Need at least one boolean" };
    }

    let numOfTrues = 0;
    let numOfFalses = 0;

    for (let item of arr) {
      if (typeof item === "boolean") {
        if (item) {
          numOfTrues++;
        } else {
          numOfFalses++;
        }
      }
    }
    const totalBools = numOfTrues + numOfFalses;
    if (totalBools === 0) {
      return { error: "Need at least one boolean" };
    }

    return numOfTrues > numOfFalses;
  }
}

module.exports = Exercises;

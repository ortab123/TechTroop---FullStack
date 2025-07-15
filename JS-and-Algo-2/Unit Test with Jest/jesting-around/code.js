// const add = function (a, b) {
//   return a - b;
// };

// const calculateHyp = function (a, b) {
//   const pythgoras = Math.sqrt(a * a + b * b);
//   return pythgoras;
// };

// const clearLowPriority = function (arr) {
//   const newArr = arr.filter((obj) => obj.priority === "HIGH");
//   return newArr;
// };

// class PictureManager {
//   constructor() {
//     this.pictureURLs = [];
//   }

//   addPicture(picURL) {
//     this.pictureURLs.push(picURL);
//   }

//   removePicture(picURL) {
//     this.pictureURLs.splice(this.pictureURLs.indexOf(picURL), 1);
//   }
// }

class ArrayManipulator {
  manipulate(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return { error: "Array lengths don't match" };
    }

    let obj = {};
    for (let i = 0; i < arr1.length; i++) {
      obj[arr1[i]] = arr2[i];
    }
    return obj;
  }
}

module.exports = ArrayManipulator;

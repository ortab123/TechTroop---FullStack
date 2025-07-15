const add = require("./code");
const calculateHpy = require("./code");
const clearLowPriority = require("./code");
const PM = require("./code");
const AM = require("./code");

// test("add should return sum of a + b", () => {
//   let sum = add(1, 2);
//   expect(sum).toBe(3);
// });

// test("calculateHpy should return square root of the sum of the numbers' squares", () => {
//   let sqrtRoot = calculateHpy(3, 4);
//   expect(sqrtRoot).toBe(5);
// });

// test("clearLowPriority should filter all LOW priority", () => {
//   let arrayOfObj = [
//     {
//       text: "Hi,",
//       priority: "HIGH",
//     },
//     {
//       text: "I'm",
//       priority: "LOW",
//     },
//     {
//       text: "Or",
//       priority: "HIGH",
//     },
//     {
//       text: "Tabibian",
//       priority: "LOW",
//     },
//   ];
//   let arrayOfHigh = clearLowPriority(arrayOfObj);
//   arrayOfHigh.forEach((obj) => expect(obj.priority).toBe("HIGH"));
// });

// test("addPicture should add a picture URL to the pictureURLs array", function () {
//   //sanity
//   const picManager = new PM();
//   expect(picManager.pictureURLs.length).toBe(0);

//   picManager.addPicture("some_url");
//   expect(picManager.pictureURLs.length).toBe(1); //test
//   expect(picManager.pictureURLs).toContain("some_url"); //double check
// });

// test("removePicture should remove a picture URL from the pictureURLs array", function () {
//   const picManager = new PM();

//   picManager.addPicture("some_url");
//   picManager.addPicture("some_url2");

//   picManager.removePicture("some_url");
//   expect(picManager.pictureURLs.length).toBe(1);
//   expect(picManager.pictureURLs).not.toContain("some_url");
// });

test("should convert two arrays of equal length to a single object with key-values from the arrays", () => {
  let arrayManipulator = new AM();
  let x = ["food", "item", "location"];
  let y = ["cherry", "lightbulb", "Tazmania"];

  let result = arrayManipulator.manipulate(x, y);

  expect(result).toEqual({
    food: "cherry",
    item: "lightbulb",
    location: "Tazmania",
  });
});

test("should return a message when array lengths don't match", () => {
  let arrayManipulator = new AM();
  let x = ["food", "item", "location"];
  let y = ["cherry", "lightbulb"];

  let result = arrayManipulator.manipulate(x, y);

  expect(result).toEqual({ error: "Array lengths don't match" });
});

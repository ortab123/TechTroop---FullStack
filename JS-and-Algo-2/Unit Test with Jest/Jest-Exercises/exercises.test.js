const E = require("./exercises");

test("isEven should return true if number is even and false if odd", () => {
  let Exercises = new E();
  let bool = Exercises.isEven(6);
  expect(bool).toBeTruthy();
});

test("removeAtLeastOne should remove at least one element from the array `arr`", () => {
  const Exercises = new E();
  const arr = [1, 2, 3, 4, 5];
  const originalLength = arr.length;

  const modifiedArr = Exercises.removeAtLeastOne([...arr]);
  expect(modifiedArr.length).toBeLessThan(originalLength);
});

test(`simplify should return a clean string without these symbols: "!"", "#", ".", ",", "'"`, () => {
  let Exercises = new E();
  let symbols = ["!", "#", ".", ",", "'"];
  let cleanString = Exercises.simplify(
    `#hi , my name is huh, my name is what ? my name is, chicka-chicka, Slim Shady!`
  );
  symbols.forEach((symbol) => {
    expect(cleanString).not.toContain(symbol);
  });
});

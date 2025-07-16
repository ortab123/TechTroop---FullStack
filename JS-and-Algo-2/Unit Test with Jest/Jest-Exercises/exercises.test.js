const E = require("./exercises");

//isEven
test("isEven should return true if number is even and false if odd", () => {
  let Exercises = new E();
  let bool = Exercises.isEven(6);
  expect(bool).toBeTruthy();
});

test("isEven should handle non-number input", () => {
  const Exercises = new E();
  expect(() => Exercises.isEven("6")).toThrow();
});

test("isEven should return true for negative even numbers", () => {
  const Exercises = new E();
  expect(Exercises.isEven(-4)).toBe(true);
});

//removeAtLeastOne
test("removeAtLeastOne should remove at least one element from the array `arr`", () => {
  const Exercises = new E();
  const arr = [1, 2, 3, 4, 5];
  const originalLength = arr.length;

  const modifiedArr = Exercises.removeAtLeastOne([...arr]);
  expect(modifiedArr.length).toBeLessThan(originalLength);
});

test("removeAtLeastOne should return empty array if only one element", () => {
  const Exercises = new E();
  const result = Exercises.removeAtLeastOne([42]);
  expect(result.length).toBe(0);
});

test("removeAtLeastOne should throw if no array is passed", () => {
  const Exercises = new E();
  expect(() => Exercises.removeAtLeastOne()).toThrow();
});

//simplify
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

test("simplify should return empty string if input is empty", () => {
  const Exercises = new E();
  expect(Exercises.simplify("")).toBe("");
});

test("simplify should not alter strings without special symbols", () => {
  const Exercises = new E();
  const input = "Hello world this is fine";
  expect(Exercises.simplify(input)).toBe(input);
});

//validate
test("validate should return error if array is empty", () => {
  const Exercises = new E();
  const result = Exercises.validate([]);

  expect(result).toEqual({ error: "Need at least one boolean" });
});

test("validate should return error if no booleans in array", () => {
  const Exercises = new E();
  const result = Exercises.validate(["or", 25, "bat yam"]);

  expect(result).toEqual({ error: "Need at least one boolean" });
});

test("validate should return true if more trues than falses", () => {
  const Exercises = new E();
  const result = Exercises.validate([true, false, true]);

  expect(result).toBeTruthy();
});

test("validate should return false if more falses than trues", () => {
  const Exercises = new E();
  const result = Exercises.validate([false, true, false]);

  expect(result).toBeFalsy();
});

test("validate should return error if input is null", () => {
  const Exercises = new E();
  const result = Exercises.validate(null);
  expect(result).toEqual({ error: "Need at least one boolean" });
});

test("validate should return error if input is not an array", () => {
  const Exercises = new E();
  const result = Exercises.validate("true,false,true");
  expect(result).toEqual({ error: "Need at least one boolean" });
});

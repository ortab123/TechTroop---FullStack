//Ex1
let meatArr = ["beef", "chicken"];
let vegetableArr = ["rabbit", "carrots", "potatoes", "lettuce"];

let [rabbit, ...fixedVegetables] = vegetableArr;

let fixedMeatArr = [...meatArr, rabbit];

console.log(fixedMeatArr);
console.log(fixedVegetables);

//Ex2
var firstPiece = { id: 101, name: "Ofri" };
var seoncdPiece = { country: "Israel" };

const fullPassport = { ...firstPiece, ...seoncdPiece };

console.log(fullPassport);

//Nullish Coalescing Exercise
let employeesArr = [
  { name: "Joey", id: 1, age: 26 },
  { name: "Lily", id: null, age: 24 },
  { name: "Alice", id: 7, age: null },
  { name: "Sam", id: 8, age: 24 },
  { name: "Ray", id: null, age: null },
];

const printNamesOfMissingData = (arr) => {
  const names = arr
    .filter((e) => (e.id ?? false) === false || (e.age ?? false) === false)
    .map((e) => e.name);

  console.log(names);
};

printNamesOfMissingData(employeesArr);

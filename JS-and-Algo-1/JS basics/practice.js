console.log(5 > 2 && false);
console.log(!("knife" === "sword"));
console.log(1 < 2 || -1 > -1 || !false);
console.log("");
console.log(31 % 5 == "1");
console.log(!!true);
console.log("5th Avenue" != "5th Avenue");
console.log(52 !== "52");
console.log(undefined || null);

let a = 3;
let c = 0;
let b = a;
b = a;
c = a;
b = c;
a = b;

console.log(a);
console.log(b);
console.log(c);

let age = 20;
if (age > 18) {
  console.log("The citizen can vote");
} else {
  console.log("The citizen can't vote");
}

let score = 85;

if (score >= 90 && score <= 100) {
  console.log("A");
} else if (score >= 80 && score < 90) {
  console.log("B");
} else if (score >= 70 && score < 80) {
  console.log("C");
} else if (score >= 60 && score < 70) {
  console.log("D");
} else console.log("F");

let temperature = 20;
let weather = "sunny";

if (weather == "sunny" && temperature > 24) {
  console.log("Go to the beach");
} else if (weather == "sunny" && temperature <= 24 && temperature >= 15) {
  console.log("Go for a walk");
} else if (weather == "sunny" && temperature < 15) {
  console.log("Stay inside and read");
} else if (weather == "rainy") {
  console.log("Watch a movie indoors");
} else if (weather == "cloudy" && temperature > 21) {
  console.log("Go hiking");
} else if (weather == "cloudy" && temperature <= 21) {
  console.log("Visit a museum");
}

let usernameLength = 6;
let passwordLength = 7;
let userAge = 15;

if (usernameLength >= 5 && passwordLength >= 8 && userAge >= 13) {
  console.log("Account created successfully!");
} else {
  if (usernameLength < 5) {
    console.log("Username must be at least 5 characters.");
  }
  if (passwordLength < 8) {
    console.log("Password must be at least 8 characters.");
  }
  if (userAge < 13) {
    console.log("You must be at least 13 years old to create an account.");
  }
}

let customerType = "premium";
let purchaseAmount = 150;
let dayOfWeek = 6;

let discount = 0;

if (customerType === "vip") {
  discount = 0.2;
} else if (customerType === "premium") {
  discount = dayOfWeek === 0 || dayOfWeek === 6 ? 0.15 : 0.1;
} else if (customerType === "regular") {
  discount = purchaseAmount > 100 ? 0.1 : purchaseAmount > 50 ? 0.05 : 0;
}

let discountedPrice = purchaseAmount * (1 - discount);

console.log(`Customer Type: ${customerType}`);
console.log(`Original Price: $${purchaseAmount}`);
console.log(`Discount Applied: ${discount * 100}%`);
console.log(`Final Price: $${discountedPrice.toFixed(2)}`);

let year = 2024;

if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log(`${year} is a leap year.`);
} else {
  console.log(`${year} is not a leap year.`);
}

//Arrays
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.splice(1, 2);
numbers[3] = 1;
numbers.splice(4, 4);
numbers.splice(0, 0, 0);
console.log(numbers);

//objects
//Ex1
let p1 = {
  name: "Or",
  age: 25,
  city: "Bat Yam",
};

let p2 = {
  name: "Eden",
  age: 27,
  city: "Bat Yam",
};

if (p1.age == p2.age && p1.city == p2.city) {
  console.log("Or wants to date Eden");
} else if (p1.city == p2.city) {
  console.log("Or wanted to date Eden,but couldn't");
}

//Ex2
const library = {
  books: [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
    },
    {
      title: "Percy Jackson",
      author: "Rick Riordan",
    },
    {
      title: "Sherlock Holmes",
      author: "Arthur Conan Doyle",
    },
    {
      title: "Around the World in Eighty Days",
      author: "Jules Verne",
    },
    {
      title: "Clifford the Big Red Dog",
      author: "Norman Bridwell",
    },
  ],
};

console.log(library);

//Ex3.1
const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true },
};

const name = "Bob";
if (reservations[name]) {
  if (!reservations[name].claimed) {
    console.log(`Welcome, ${name}`);
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else console.log("You have no reservation");

//Ex3.1
const reservations1 = {
  Bob: { claimed: false },
  Ted: { claimed: true },
};

const name1 = "Alice";
if (reservations1[name1]) {
  if (!reservations1[name1].claimed) {
    console.log(`Welcome, ${name1}`);
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else {
  reservations1[name1] = { claimed: false };
  console.log(`No reservation found for ${name1}, but we added one for you!`);
}
console.log(reservations1);

//Ex3.2
const reservations2 = {
  Bob: { claimed: false },
  Ted: { claimed: true },
};

const inputName = "aDrIaN";
const name2 =
  inputName.charAt(0).toUpperCase() + inputName.slice(1).toLowerCase();

if (reservations2[name2]) {
  if (!reservations2[name2].claimed) {
    console.log(`Welcome, ${name2}`);
  } else {
    console.log("Hmm, someone already claimed this reservation");
  }
} else {
  console.log("You have no reservation, but we’ll add you now.");
  reservations2[name2] = { claimed: true };
  console.log(`Reservation created and claimed for ${name2}`);
}
console.log(reservations2);

//Ex4
const date = 3;

const kitchen = {
  owner: "Geraldine",
  hasOven: false,
  fridge: {
    price: 500,
    works: true,
    items: [
      { name: "cheese", expiryDate: 7 },
      { name: "radish", expiryDate: 2 },
      { name: "bread", expiryDate: 1 },
    ],
  },
};

const hasOven = kitchen.hasOven;
const works = kitchen.fridge.works;
const fixCost = kitchen.fridge.price / 2;
const radish = kitchen.fridge.items[1];
const daysExpired = date - radish.expiryDate;

if (hasOven && works) {
  console.log(
    `${kitchen.owner}'s ${radish.name} expired ${daysExpired} day ago. Weird, considering her fridge works. Luckily, she has an oven to cook the radish in.`
  );
} else if (!hasOven && works) {
  console.log(
    `${kitchen.owner}'s ${radish.name} expired ${daysExpired} day ago. Weird, considering her fridge works. Too bad she doesn't have an oven to cook the radish in.`
  );
} else if (hasOven && !works) {
  console.log(
    `${kitchen.owner}'s ${radish.name} expired ${daysExpired} day ago. Probably because her fridge doesn't work. Luckily, she has an oven to cook the radish in. And she'll have to pay ${fixCost} to fix the fridge.`
  );
} else {
  console.log(
    `${kitchen.owner}'s ${radish.name} expired ${daysExpired} day ago. Probably because her fridge doesn't work. Too bad she doesn't have an oven to cook the radish in. And she'll have to pay ${fixCost} to fix the fridge.`
  );
}

//loops
//Ex1
const names = ["Ashley", "Donovan", "Lucas"];
const ages = [23, 47, 18];
const people = [];

for (let i = 0; i < names.length; i++) {
  people.push({
    name: names[i],
    age: ages[i],
  });
}

console.log(people);

//Ex2
for (let person of people) {
  console.log(`${person.name} is ${person.age} years old`);
}

//Ex3
const posts = [
  { id: 1, text: "Love this product" },
  { id: 2, text: "This is the worst. DON'T BUY!" },
  { id: 3, text: "So glad I found this. Bought four already!" },
];

for (let i = 0; i < posts.length; i++) {
  if (posts[i].id === 2) {
    posts.splice(i, 1);
    break;
  }
}

console.log(posts);

//Ex4
const posts1 = [
  {
    id: 1,
    text: "Love this product",
    comments: [],
  },
  {
    id: 2,
    text: "This is the worst. DON'T BUY!",
    comments: [
      { id: 1, text: "Idiot has no idea" },
      { id: 2, text: "Fool!" },
      { id: 3, text: "I agree!" },
    ],
  },
  {
    id: 3,
    text: "So glad I found this. Bought four already!",
    comments: [],
  },
];

for (let post of posts1) {
  if (post.id === 2) {
    for (let i = 0; i < post.comments.length; i++) {
      if (post.comments[i].id === 3) {
        post.comments.splice(i, 1);
        break;
      }
    }
  }
}

console.log(posts1[1].comments);

//Ex5
const dictionary = {
  A: ["Aardvark", "Abacus", "Actually", "Atomic"],
  B: ["Banana", "Bonkers", "Brain", "Bump"],
  C: ["Callous", "Chain", "Coil", "Czech"],
};

const keys = Object.keys(dictionary);
for (let i = 0; i < keys.length; i++) {
  const currentKey = keys[i];
  console.log(`Words that begin with ${currentKey}:`);

  const words = dictionary[currentKey];
  for (let j = 0; j < words.length; j++) {
    console.log(`  ${words[j]}`);
  }
}

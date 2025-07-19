//Ex1
const people_info = [
  {
    name: "guido",
    profession: "bungalow builder",
    age: 17,
    country: "canaland",
    city: "sydurn",
    catchphrase: "what a piece of wood!",
  },
  {
    name: "petra",
    profession: "jet plane mechanic",
    age: 31,
    country: "greenmark",
    city: "bostork",
    catchphrase: "that's my engine, bub",
  },
  {
    name: "damian",
    profession: "nursery assistant",
    age: 72,
    country: "zimbia",
    city: "bekyo",
    catchphrase: "with great responsibility comes great power",
  },
];

const capitalize = function (str) {
  let capitalizedStr = "";
  capitalizedStr += str[0].toUpperCase();
  capitalizedStr += str.slice(1);
  return capitalizedStr;
};

const getAge = function (age) {
  if (age < 21) {
    return "Underage";
  } else if (age > 55) {
    return "55+";
  } else {
    return age;
  }
};

function capitalizeProfession(str) {
  const words = str.split(" ");
  const result = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const capitalized = word[0].toUpperCase() + word.slice(1);
    result.push(capitalized);
  }

  return result.join(" ");
}

function formatLocation(city, country) {
  const capCity = city[0].toUpperCase() + city.slice(1);
  const capCountry = country[0].toUpperCase() + country.slice(1);
  return capCity + ", " + capCountry + ".";
}

const capitalizeCatchphrase = function (str) {
  const capFirstLetter = str[0].toUpperCase() + str.slice(1);
  const quotedStr = `"${str}"`;
  return quotedStr;
};

const getSummary = function (person) {
  let summary = "";
  summary += capitalize(person.name);
  summary += ` is ${getAge(person.age)} `;
  summary += capitalizeProfession(person.profession);
  summary += ` ${formatLocation(person.city, person.country)}`;
  summary += ` ${capitalize(person.name)} loves to say ${capitalizeCatchphrase(
    person.catchphrase
  )}`;
  return summary;
};

for (let person of people_info) {
  console.log(getSummary(person));
}

//Ex2
const story =
  "In the beginning there was light. Then there were wolves. Finally there was a big fire. Ultimately, Shelob the wolf-master put out the fire with her feet. But until then, the fire caused one heck of a lot of damage.";
const specialChars = [",", ".", "'", '"', "?", "!", ";"];
const wordCounts = {};

const cleanText = function (sentence) {
  let cleanedSentence = sentence;
  for (let char of specialChars) {
    cleanedSentence = cleanedSentence.split(char).join("");
  }

  cleanedSentence = cleanedSentence.toLowerCase();
  const words = cleanedSentence.split(" ");
  return words;
};

const addToCounter = function (wordsArray) {
  for (let word of wordsArray) {
    if (wordCounts[word]) {
      wordCounts[word] += 1;
    } else {
      wordCounts[word] = 1;
    }
  }
};

function countWords(text) {
  const cleanedWords = cleanText(text);
  addToCounter(cleanedWords);
}

countWords(story);
console.log(wordCounts);

const str = "My name is, Or Tabibian! and i love music.";
countWords(str);
console.log(wordCounts);

let users = [];

const getData = function (callback) {
  setTimeout(function () {
    users = [{ name: "Rick" }, { name: "Morty" }];
    console.log("Got users");
    callback();
  }, 3000);
};

const displayData1 = function () {
  console.log("Going to display:");
  for (let user of users) {
    console.log(user.name);
  }
};

getData(displayData1);

const square = (num) => console.log(mun * num);

const getFormalTitle = (title, name) => title + " " + name;

formalTitle = getFormalTitle("Madamme", "Lellouche");
console.log(formalTitle);

//Ex1
const pushPull = (action) => {
  action();
};

const push = () => console.log("pushing it!");
const pull = () => console.log("pulling it!");

pushPull(push);
pushPull(pull);

//Ex2
const getTime = (callback) => {
  const time = new Date();
  callback(time);
};

const returnTime = function (time) {
  console.log("The current time is: " + time);
};

getTime(returnTime);

//Ex3
const displayData = function (alertDataFunc, logDataFunc, data) {
  alertDataFunc(data);
  logDataFunc(data);
};

const logData = (data) => {
  console.log(data);
};

displayData(console.error, logData, "I like to party");

//Ex4
const sum = (x, y, z) => x + y + z;

console.log(sum(7, 21, 63));

//Ex5
const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

console.log(capitalize("bOb")); // returns Bob
console.log(capitalize("TAYLOR")); // returns Taylor
console.log(capitalize("feliSHIA"));

//Ex5
const determineWeather = (temp) => {
  if (temp > 25) {
    return "hot";
  }
  return "cold";
};

const commentOnWeather = (temp) => "It's " + determineWeather(temp);

console.log(commentOnWeather(26));

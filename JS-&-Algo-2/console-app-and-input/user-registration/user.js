const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  "What is your name? ",
  "What is your email? ",
  "What is your favorite color? ",
  "What is your age?",
];

const answers = [];
let i = 0;

const askQuestion = () => {
  if (i < questions.length) {
    rl.question(questions[i], (answer) => {
      answers.push(answer);
      i++;
      askQuestion();
    });
  } else {
    rl.close();
    showSummery();
  }
};

const showSummery = () => {
  console.log(`\nRegistration Summery:`);
  console.log(`Name:${answers[0]}`);
  console.log(`Email:${answers[1]}`);
  console.log(`Favorite color:${answers[2]}`);
  console.log(`Age:${answers[3]}`);
};

askQuestion();

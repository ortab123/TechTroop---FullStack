const prompt = require("prompt-sync")();

const questions = [
  {
    question:
      "Who is the best Basketball player in the world(give the full name)?",
    answer: "Stephen Curry",
  },
  {
    question: "Who is the best Tennis player in the world(give the full name)?",
    answer: "Carlos Alcaraz",
  },
  {
    question: "Who is the best Soccer player in the world(give the full name)?",
    answer: "Lionel Messi",
  },
];

let score = 0;

questions.forEach((q, index) => {
  const userAnswer = prompt(`Question ${index + 1}: ${q.question}`);

  if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
    console.log("Correct!\n");
    score++;
  } else {
    console.log(`Wrong. The correct answer is: ${q.answer}\n`);
  }
});

console.log(`Final Score: ${score}/${questions.length} correct!`);

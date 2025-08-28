const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const wordCounter = {};

app.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});

app.get("/word/:word", (req, res) => {
  const word = req.params.word.toLowerCase();
  const count = wordCounter[word] || 0;
  res.json({ count });
});

app.post("/word", (req, res) => {
  const word = req.body.word;
  if (!word || typeof word !== "string") {
    return res
      .status(400)
      .json({ error: "Please provide a single word as a string" });
  }

  const key = word.toLowerCase();

  if (wordCounter[key]) {
    wordCounter[key] += 1;
  } else {
    wordCounter[key] = 1;
  }

  res.json({
    text: `Added ${key}`,
    currentCount: wordCounter[key],
  });
});

app.post("/sentence", (req, res) => {
  const sentence = req.body.sentence;
  if (!sentence || typeof sentence !== "string") {
    return res
      .status(400)
      .json({ error: "Please provide a valid sentence as a string" });
  }

  const words = sentence.split(/\s+/);
  let numNewWords = 0;
  let numOldWords = 0;

  words.forEach((word) => {
    const key = word.toLowerCase();
    if (wordCounter[key]) {
      wordCounter[key] += 1;
      numOldWords += 1;
    } else {
      wordCounter[key] = 1;
      numNewWords += 1;
    }
  });

  res.json({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: -1,
  });
});

app.delete("/word/:word", (req, res) => {
  const { word } = req.params;

  if (!wordCounter[word]) {
    return res.status(404).json({
      error: `The word "${word}" does not exist in the counter`,
    });
  }

  delete wordCounter[word];

  res.status(200).json({
    text: `The word "${word}" has been deleted successfully`,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

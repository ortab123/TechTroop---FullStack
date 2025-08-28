const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const wordCounter = {};

app.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});

app.get("/word/:word", (req, res) => {
  const word = normalizeWord(req.params.word);
  const count = wordCounter[word] || 0;
  res.json({ count });
});

app.post("/word", (req, res) => {
  const word = normalizeWord(req.body.word);
  if (!word) {
    return res.status(400).json({ error: "Invalid word" });
  }

  wordCounter[word] = (wordCounter[word] || 0) + 1;

  res.json({
    text: `Added ${word}`,
    currentCount: wordCounter[word],
  });
});

app.post("/sentence", (req, res) => {
  const sentence = req.body.sentence;
  if (!sentence) {
    return res.status(400).json({ error: "Sentence is required" });
  }

  const words = sentence.split(" ");
  let numNewWords = 0;
  let numOldWords = 0;

  words.forEach((rawWord) => {
    const word = normalizeWord(rawWord);
    if (!word) return;

    if (wordCounter[word]) {
      wordCounter[word] += 1;
      numOldWords++;
    } else {
      wordCounter[word] = 1;
      numNewWords++;
    }
  });

  res.json({
    text: `Added ${numNewWords} words, ${numOldWords} already existed`,
    currentCount: -1,
  });
});

app.delete("/word/:word", (req, res) => {
  const word = normalizeWord(req.params.word);
  if (!wordCounter[word]) {
    return res
      .status(404)
      .json({ error: `The word "${word}" does not exist in the counter` });
  }

  delete wordCounter[word];
  res
    .status(200)
    .json({ text: `The word "${word}" has been deleted successfully` });
});

app.get("/popular", (req, res) => {
  const entries = Object.entries(wordCounter);
  if (entries.length === 0) {
    return res.status(404).json({ error: "No words found" });
  }

  let [popularWord, maxCount] = entries[0];
  for (let [word, count] of entries) {
    if (count > maxCount) {
      popularWord = word;
      maxCount = count;
    }
  }

  res.json({ text: popularWord, count: maxCount });
});

function normalizeWord(word) {
  return word.toLowerCase().replace(/[^a-z]/g, "");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

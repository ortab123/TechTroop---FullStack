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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

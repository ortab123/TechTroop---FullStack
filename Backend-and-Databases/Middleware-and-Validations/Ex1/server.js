const express = require("express");
const {
  loggingMiddleware,
  requestCounterMiddleware,
} = require("./middlewares");

const app = express();
const port = 3000;

app.use(loggingMiddleware);
app.use(requestCounterMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "Welcome!", requestCount: req.requestCount });
});

app.get("/about", (req, res) => {
  res.json({ message: "About page", requestCount: req.requestCount });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

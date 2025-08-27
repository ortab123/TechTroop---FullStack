const express = require("express");
const {
  loggerWithTiming,
  rateLimiter,
  requireJson,
  responseFormatter,
  errorHandler,
} = require("./middlewares");
const postsRouter = require("./routes/posts");

const app = express();
const port = 3000;

app.use(responseFormatter);
app.use(loggerWithTiming);
app.use(rateLimiter);
app.use(requireJson);
app.use(express.json());

app.use("/posts", postsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

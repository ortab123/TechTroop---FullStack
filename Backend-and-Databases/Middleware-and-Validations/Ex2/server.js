const express = require("express");
const users = require("./data");
const {
  validateId,
  checkResourceExists,
  errorHandler,
} = require("./middlewares");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", validateId, checkResourceExists, (req, res) => {
  res.json(req.user);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

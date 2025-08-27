const users = require("./data");

// Middleware 1: validateId
function validateId(req, res, next) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    const err = new Error("Invalid ID format");
    err.status = 400;
    return next(err);
  }
  req.userId = id;
  next();
}

// Middleware 2: checkResourceExists
function checkResourceExists(req, res, next) {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err);
  }
  req.user = user;
  next();
}

// Middleware 3: errorHandler
function errorHandler(err, req, res, next) {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message });
}

module.exports = {
  validateId,
  checkResourceExists,
  errorHandler,
};

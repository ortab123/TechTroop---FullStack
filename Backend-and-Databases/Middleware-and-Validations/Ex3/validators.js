const Ajv = require("ajv");
const { body, param, validationResult } = require("express-validator");
const { postSchema } = require("./schemas");
const { posts } = require("./data");

// ---- AJV (Posts) ----
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
const validatePostAjv = ajv.compile(postSchema);

function validatePost(req, res, next) {
  const valid = validatePostAjv(req.body);
  if (!valid) {
    const details = validatePostAjv.errors;
    const err = new Error("Post validation failed");
    err.status = 400;
    err.details = details;
    return next(err);
  }
  next();
}

// ---- express-validator (Comments) ----
const validateCreateComment = [
  param("postId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("postId must be a positive integer"),
  body("content")
    .isString()
    .isLength({ min: 5, max: 500 })
    .withMessage("content must be 5-500 chars"),
  body("email").isEmail().withMessage("email must be valid"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Comment validation failed");
      err.status = 400;
      err.details = errors.array();
      return next(err);
    }
    next();
  },
];

function checkPostExists(req, res, next) {
  const postId = req.params.postId ? Number(req.params.postId) : undefined;
  const post = posts.find((p) => p.id === postId);
  if (!post) {
    const err = new Error("Post not found");
    err.status = 404;
    return next(err);
  }
  req.post = post;
  next();
}

const validatePostIdOnly = [
  param("postId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("postId must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Invalid postId");
      err.status = 400;
      err.details = errors.array();
      return next(err);
    }
    next();
  },
];

module.exports = {
  validatePost,
  validateCreateComment,
  checkPostExists,
  validatePostIdOnly,
};

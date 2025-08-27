const express = require("express");
const router = express.Router();
const { posts, comments, nextPostId, nextCommentId } = require("../data");
const {
  validatePost,
  validateCreateComment,
  checkPostExists,
  validatePostIdOnly,
} = require("../validators");

router.get("/", (req, res) => {
  return res.ok(posts);
});

router.post("/", validatePost, (req, res) => {
  const newPost = {
    id: nextPostId(),
    title: req.body.title,
    content: req.body.content,
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    ...(req.body.category ? { category: req.body.category } : {}),
  };
  posts.push(newPost);
  return res.ok(newPost, 201);
});

router.get("/:postId/comments", validatePostIdOnly, (req, res) => {
  const postId = Number(req.params.postId);
  const result = comments.filter((c) => c.postId === postId);
  return res.ok(result);
});

router.post(
  "/:postId/comments",
  validateCreateComment,
  checkPostExists,
  (req, res) => {
    const comment = {
      id: nextCommentId(),
      postId: Number(req.params.postId),
      content: req.body.content,
      email: req.body.email,
      createdAt: new Date().toISOString(),
    };
    comments.push(comment);
    return res.ok(comment, 201);
  }
);

module.exports = router;

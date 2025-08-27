const posts = [];
const comments = [];

let postIdSeq = 1;
let commentIdSeq = 1;

function nextPostId() {
  return postIdSeq++;
}
function nextCommentId() {
  return commentIdSeq++;
}

module.exports = { posts, comments, nextPostId, nextCommentId };

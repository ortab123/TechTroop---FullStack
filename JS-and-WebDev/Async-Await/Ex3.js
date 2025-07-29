async function dashboard() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts`).then((r) => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/comments`).then((r) =>
        r.json()
      ),
    ]);

    const totalUsers = users.length;
    const totalPosts = posts.length;
    const totalComments = comments.length;
    const avgPostsPerUser = totalPosts / totalUsers;
    const avgCommentsPerPost = totalComments / totalPosts;

    const postCountByUser = {};
    posts.forEach((post) => {
      postCountByUser[post.userId] = (postCountByUser[post.userId] || 0) + 1;
    });

    const commentsCountByUser = {};
    posts.forEach((post) => {
      const commentCount = comments.filter(
        (comment) => comment.postId === post.id
      ).length;
      commentsCountByUser[post.userId] =
        (commentsCountByUser[post.userId] || 0) + commentCount;
    });

    const topUsers = users
      .map((user) => ({
        name: user.name,
        postCount: postCountByUser[user.id] || 0,
        commentCount: commentsCountByUser[user.id] || 0,
      }))
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 3);

    const recentPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);

    return {
      summary: {
        totalUsers,
        totalPosts,
        totalComments,
        avgPostsPerUser,
        avgCommentsPerPost,
      },
      topUsers,
      recentPosts,
    };
  } catch (error) {
    console.error("Error loading dashboard:", error.message);
    return null;
  }
}

let result;
dashboard().then((data) => {
  result = data;
  console.log("Ready! You can now test `result` in the console.");
});

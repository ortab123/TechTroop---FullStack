async function getUserWithPosts(userId) {
  try {
    const responseUser = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    if (!responseUser.ok) {
      throw new Error("User not found");
    }
    const userInfo = await responseUser.json();

    const responsePosts = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    if (!responsePosts.ok) {
      throw new Error("Posts not found");
    }
    const postsInfo = await responsePosts.json();

    return {
      user: userInfo,
      posts: postsInfo,
    };
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }
}

getUserWithPosts(4).then((data) => console.log(data));
getUserWithPosts(999).then((data) => console.log(data));

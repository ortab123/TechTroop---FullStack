import { useEffect, useState } from "react";
import getPosts from "./postsMockData.js";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const postsData = async () => {
      let fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    postsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      console.log("innerWidth:", window.innerWidth);
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title"> Top Posts</h1>
      <div className={isSmallScreen ? "posts-list" : "posts-grid"}>
        {posts.slice(0, 10).map((p) => (
          <article key={p.id} className="post">
            <h3>
              <strong>{p.title}</strong>
            </h3>
            <p>{p.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

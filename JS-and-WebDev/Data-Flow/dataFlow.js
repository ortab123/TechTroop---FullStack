const postsArr = [
  {
    name: "Or",
    text: "I love ice-cream",
  },
  {
    name: "Eden",
    text: "I'm celebrating my birthday this week",
  },
];

function render() {
  const postsContainer = $("#posts");
  postsContainer.empty();

  for (let post of postsArr) {
    const div = document.createElement("div");
    div.textContent = `${post.name}: ${post.text}`;
    postsContainer.append(div);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  render();

  const button = document.getElementById("post-button");

  button.addEventListener("click", () => {
    const name = document.getElementById("user-name").value.trim();
    const text = document.getElementById("post-content").value.trim();

    if (name && text) {
      postsArr.push({ name, text });
      render();

      document.getElementById("user-name").value = "";
      document.getElementById("post-content").value = "";
    }
  });
});

const ball = document.getElementById("ball");
const field = document.getElementById("playing-field");

ball.style.backgroundColor = "yellow";

function moveBall(direction) {
  const step = 15;

  let currentLeft = parseInt(ball.style.left) || 0;
  let currentTop = parseInt(ball.style.top) || 0;

  const maxRight = field.clientWidth - ball.offsetWidth;
  const maxBottom = field.clientHeight - ball.offsetHeight;

  switch (direction) {
    case "right":
      if (currentLeft + step <= maxRight)
        ball.style.left = currentLeft + step + "px";
      break;
    case "left":
      if (currentLeft - step >= 0) ball.style.left = currentLeft - step + "px";
      break;
    case "down":
      if (currentTop + step <= maxBottom)
        ball.style.top = currentTop + step + "px";
      break;
    case "up":
      if (currentTop - step >= 0) ball.style.top = currentTop - step + "px";
      break;
  }
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowRight":
      event.preventDefault();
      moveRight();
      break;
    case "ArrowLeft":
      event.preventDefault();
      moveLeft();
      break;
    case "ArrowDown":
      event.preventDefault();
      moveDown();
      break;
    case "ArrowUp":
      event.preventDefault();
      moveUp();
      break;
  }
});

const moveRight = () => moveBall("right");
const moveLeft = () => moveBall("left");
const moveUp = () => moveBall("up");
const moveDown = () => moveBall("down");

const header = document.createElement("h1");
header.innerHTML = "The Best Game Ever";
header.style.color = "#c0392b";
header.style.fontFamily = "Helvetica";
document.body.appendChild(header);

const subHeader = document.createElement("h2");
subHeader.className = "sub-header";
subHeader.innerHTML = "Game by: Or Tabibian";
document.body.appendChild(subHeader);

console.log("Key pressed:", event.key);

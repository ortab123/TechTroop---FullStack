generateBoxes = () => {
  const container = document.getElementById("container");
  const numOfBoxes = 36;

  for (let i = 0; i < numOfBoxes; i++) {
    const box = document.createElement("div");
    box.classList.add("box");

    box.addEventListener("mouseenter", function () {
      box.style.background = getRandomColor();
      checkAllBoxesSameColor();
    });

    container.appendChild(box);
  }
};

getRandomColor = () => {
  let maxVal = 0xffffff;
  let randomNumber = Math.floor(Math.random() * maxVal);
  let hexColor = randomNumber.toString(16).padStart(6, "0");
  return `#${hexColor.toUpperCase()}`;
};

checkAllBoxesSameColor = () => {
  const boxes = document.getElementsByClassName("box");
  if (boxes.length === 0) return;

  const firstColor = boxes[0].style.background;
  for (let box of boxes) {
    if (box.style.background !== firstColor) {
      document.getElementById("message").innerText = "";
      return;
    }
  }

  document.getElementById("message").innerText = "Nice job!";
};

generateBoxes();

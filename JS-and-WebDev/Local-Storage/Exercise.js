document.addEventListener("DOMContentLoaded", function () {
  let wisdom = [];
  const userInput = document.getElementById("inputField");
  const displaybutton = document.getElementById("saveButton");
  const clearWisdom = document.getElementById("clearWisdom");
  const displayArea = document.getElementById("display-area");

  const storedWisdom = JSON.parse(localStorage.getItem("wisdom")) || [];
  wisdom = storedWisdom;
  storedWisdom.forEach((item) => {
    displayItem(item);
  });

  displaybutton.addEventListener("click", function () {
    const text = userInput.value.trim();
    if (text !== "") {
      const newItem = {
        id: Date.now(),
        text,
      };
      wisdom.push(newItem);
      displayItem(newItem);

      if (wisdom.length % 2 === 0) {
        localStorage.setItem("wisdom", JSON.stringify(wisdom));
      }

      userInput.value = "";
    }
  });

  clearWisdom.addEventListener("click", function () {
    localStorage.clear();
    wisdom = [];
    displayArea.innerHTML = "";
  });

  function displayItem(item) {
    const p = document.createElement("p");
    p.setAttribute("data-id", item.id);

    const removeBtn = document.createElement("span");
    removeBtn.textContent = " ❌";
    removeBtn.style.cursor = "pointer";
    removeBtn.style.color = "red";
    removeBtn.style.marginLeft = "10px";

    removeBtn.addEventListener("click", () => {
      wisdom = wisdom.filter((w) => w.id !== item.id);
      localStorage.setItem("wisdom", JSON.stringify(wisdom));
      p.remove();
    });

    const textNode = document.createTextNode(item.text);
    p.appendChild(removeBtn);
    p.appendChild(textNode);
    displayArea.appendChild(p);
  }
});

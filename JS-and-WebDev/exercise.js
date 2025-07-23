function addItem1() {
  const input = document.getElementById("itemInput");
  const itemText = input.value.trim();

  if (itemText !== "") {
    const li = document.createElement("li");
    li.textContent = itemText;
    document.getElementById("shoppingList").appendChild(li);
    input.value = "";
  }
}

const list = document.getElementById("myList");
const addItem = function () {
  const newItem = document.createElement("li");
  newItem.innerHTML = "A new item!";
  list.appendChild(newItem);
};

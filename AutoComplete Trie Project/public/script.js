import trieWebController from "../src/controller/trieWebController.js";
import domView from "../src/view/domView.js";

document.addEventListener("DOMContentLoaded", () => {
  domView.init();

  const addButton = document.getElementById("add-word");
  addButton.addEventListener("click", () => {
    const word = domView.getEnteredWord();

    if (!word) return;

    trieWebController.addWord(word);
    domView.clearInput();
    domView.showAddedMessage(word);

    const count = trieWebController.getWordCount();

    domView.updateWordCount(count);
  });
});

import trieWebController from "../src/controller/trieWebController.js";
import domView from "../src/view/domView.js";

document.addEventListener("DOMContentLoaded", () => {
  domView.init();

  const addButton = document.getElementById("add-word");
  addButton.addEventListener("click", () => {
    const word = domView.getEnteredWord();

    if (!word) {
      domView.showErrorMessage("Cannot add empty word.");
      return;
    }

    try {
      trieWebController.addWord(word);
      domView.clearInput();
      domView.showAddedMessage(word);
      const count = trieWebController.getWordCount();
      domView.updateWordCount(count);
    } catch (err) {
      domView.showErrorMessage(`Cannot add "${word}": ${err.message}`);
    }
  });
});

document.getElementById("search-word").addEventListener("input", (e) => {
  const prefix = e.target.value.trim();
  if (!prefix) {
    domView.showSuggestions([]);
    return;
  }

  try {
    const suggestions = trieWebController.getSuggestions(prefix);
    domView.showSuggestions(suggestions);
  } catch (err) {
    domView.showErrorMessage(err.message);
  }
});

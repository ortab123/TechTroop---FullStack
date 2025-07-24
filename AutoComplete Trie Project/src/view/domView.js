import trieWebController from "../controller/trieWebController.js";

const domView = (() => {
  let addInput, searchInput, wordCountDisplay, addMessage;

  function init() {
    addInput = document.getElementById("enter-word");
    searchInput = document.getElementById("search-word");
    wordCountDisplay = document.getElementById("word-count");
    addMessage = document.getElementById("add-message");
  }

  function getEnteredWord() {
    return addInput.value.trim();
  }

  function clearInput() {
    addInput.value = "";
  }

  function showAddedMessage(word, count = null) {
    if (word.startsWith("use '")) {
      addMessage.textContent = `✔ ${word}`;
    } else if (count !== null) {
      addMessage.textContent = `✔ use '${word}' (${count} times)`;
    } else {
      addMessage.textContent = `✔ Added '${word}' to dictionary`;
    }

    addMessage.style.backgroundColor = "#d4edda";
    addMessage.style.color = "#155724";
    addMessage.style.borderColor = "#c3e6cb";
    addMessage.classList.remove("hidden");
  }

  function showErrorMessage(message) {
    addMessage.textContent = `✗ ${message}`;
    addMessage.style.backgroundColor = "#f8d7da";
    addMessage.style.color = "#721c24";
    addMessage.style.borderColor = "#f5c6cb";
    addMessage.classList.remove("hidden");
  }

  function updateWordCount(count) {
    wordCountDisplay.textContent = count;
  }

  function showSuggestions(suggestions) {
    const list = document.getElementById("suggestions-list");
    const prefix = document
      .getElementById("search-word")
      .value.trim()
      .toLowerCase();
    list.innerHTML = "";

    if (!suggestions.length) {
      list.classList.add("hidden");
      return;
    }

    suggestions.forEach((word) => {
      const li = document.createElement("li");

      const highlighted = `<span style="background-color: #f8d7da; font-weight: bold;">${word.slice(0, prefix.length)}</span>${word.slice(prefix.length)}`;
      li.innerHTML = highlighted;
      li.addEventListener("click", () => {
        document.getElementById("search-word").value = word;

        const freq = trieWebController.useWord(word); // ← הפונקציה מחזירה את כמות הפעמים
        list.classList.add("hidden");

        domView.showAddedMessage(word, freq);
      });
      list.appendChild(li);
    });

    list.classList.remove("hidden");
  }
  return {
    init,
    getEnteredWord,
    clearInput,
    showAddedMessage,
    showErrorMessage,
    updateWordCount,
    showSuggestions,
  };
})();

export default domView;

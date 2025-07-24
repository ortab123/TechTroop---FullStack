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

  function showAddedMessage(word) {
    addMessage.textContent = `✔ Added '${word}' to dictionary`;
    addMessage.classList.remove("hidden");

    setTimeout(() => {
      addMessage.classList.add("hidden");
    }, 5000);
  }

  function updateWordCount(count) {
    wordCountDisplay.textContent = count;
  }

  return {
    init,
    getEnteredWord,
    clearInput,
    showAddedMessage,
    updateWordCount,
  };
})();

export default domView;

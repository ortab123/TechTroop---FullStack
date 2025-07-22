class View {
  showMessage(message) {
    console.log(message);
  }

  showError(error) {
    console.log(`✗ ${error.message || error}\n`);
  }

  showSuggestions(prefix, suggestions) {
    if (suggestions.length === 0) {
      console.log(`No suggestions found for '${prefix}'\n`);
    } else {
      const formatted = suggestions
        .map((entry) => `${entry.word} (${entry.freq})`)
        .join(", ");
      console.log(`Suggestions for '${prefix}': ${formatted}\n`);
    }
  }

  showHelp() {
    console.log("Commands:");
    console.log("  add <word>        - Add word to dictionary");
    console.log("  find <word>       - Check if word exists");
    console.log("  complete <prefix> - Get completions");
    console.log("  use <word>        - Increase usage count");
    console.log("  help              - Show this message");
    console.log("  exit              - Quit program\n");
  }
}

module.exports = View;

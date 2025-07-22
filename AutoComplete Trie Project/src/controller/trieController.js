const AutoCompleteTrie = require("../model/autoCompleteTrie");

class TrieController {
  constructor(view) {
    this.trie = new AutoCompleteTrie();
    this.view = view;
  }

  handleCommand(command, args) {
    switch (command) {
      case "add":
        return this.addWord(args);
      case "find":
        return this.findWord(args);
      case "complete":
        return this.complete(args);
      case "use":
        return this.use(args);
      case "help":
        return this.view.showHelp();
      case "exit":
        this.view.showMessage("Goodbye!");
        process.exit(0);
      default:
        return this.view.showMessage(`✗ Unknown command: '${command}'\n`);
    }
  }

  _runCommand(args, expectedArgCount, callback) {
    if (args.length !== expectedArgCount) {
      return this.view.showMessage("✗ Invalid usage\n");
    }

    try {
      callback(args);
    } catch (err) {
      this.view.showError(err);
    }
  }

  addWord(args) {
    this._runCommand(args, 1, ([word]) => {
      this.trie.addWord(word);
      this.view.showMessage(`✓ Added '${word}' to dictionary\n`);
    });
  }

  findWord(args) {
    this._runCommand(args, 1, ([word]) => {
      const found = this.trie.findWord(word);
      const msg = found
        ? `✓ '${word}' exists in dictionary\n`
        : `✗ '${word}' not found in dictionary\n`;
      this.view.showMessage(msg);
    });
  }

  complete(args) {
    this._runCommand(args, 1, ([prefix]) => {
      const suggestions = this.trie.predictWords(prefix);
      this.view.showSuggestions(prefix, suggestions);
    });
  }

  use(args) {
    this._runCommand(args, 1, ([word]) => {
      const freq = this.trie.incrementUsage(word);
      this.view.showMessage(`✓ Increment usage for '${word}' (now ${freq})\n`);
    });
  }
}

module.exports = TrieController;

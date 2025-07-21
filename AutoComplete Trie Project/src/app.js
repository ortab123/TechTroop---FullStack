const readline = require("readline");
const AutoCompleteTrie = require("./autoCompleteTrie");

const trie = new AutoCompleteTrie();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  const [command, ...args] = input.split(" ");

  switch (command) {
    case "add":
      if (args.length !== 1) {
        console.log("✗ Usage: add only one word at a time");
      } else {
        const word = args[0];
        try {
          trie.addWord(word);
          console.log(`✓ Added '${word}' to dictionary\n`);
        } catch (err) {
          console.log(`✗ ${err.message}\n`);
        }
      }
      break;

    case "find":
      if (args.length !== 1) {
        console.log("✗ Usage: find <word>");
      } else {
        const word = args[0];
        try {
          const found = trie.findWord(word);
          if (found) {
            console.log(`✓ '${word}' exists in dictionary\n`);
          } else {
            console.log(`✗ '${word}' not found in dictionary\n`);
          }
        } catch (err) {
          console.log(`✗ ${err.message}\n`);
        }
      }
      break;

    case "complete":
      if (args.length !== 1) {
        console.log("✗ Usage: complete <prefix>\n");
      } else {
        const prefix = args[0];
        try {
          const suggestions = trie.predictWords(prefix);
          if (suggestions.length > 0) {
            const formatted = suggestions
              .map((entry) => `${entry.word} (${entry.freq})`)
              .join(", ");
            console.log(`Suggestions for '${prefix}': ${formatted}\n`);
          } else {
            console.log(`No suggestions found for '${prefix}'\n`);
          }
        } catch (err) {
          console.log(`✗ ${err.message}\n`);
        }
      }
      break;

    case "use":
      if (args.length !== 1) {
        console.log("✗ Usage: add only one word at a time");
      } else {
        const word = args[0];
        try {
          const frequency = trie.incrementUsage(word);
          console.log(`✓ Increment usage for '${word}' (now ${frequency})\n`);
        } catch (error) {
          console.log(`✗ ${error.message}`);
        }
      }
      break;

    case "help":
      console.log("Commands:");
      console.log("  add <word>        - Add word to dictionary");
      console.log("  find <word>       - Check if word exists");
      console.log("  complete <prefix> - Get completions");
      console.log("  help              - Show this message");
      console.log("  exit              - Quit program\n");
      break;

    case "exit":
      console.log("Goodbye!");
      rl.close();
      return;

    default:
      console.log(
        `✗ Unknown command: '${command}' (type 'help' for commands)\n`
      );
  }

  rl.prompt();
});

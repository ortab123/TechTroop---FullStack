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
        console.log("✗ Usage: add <word>");
      } else {
        const word = args[0];
        trie.addWord(word);
        console.log(`✓ Added '${word}' to dictionary`);
      }
      break;

    case "find":
      if (args.length !== 1) {
        console.log("✗ Usage: find <word>");
      } else {
        const word = args[0];
        const found = trie.findWord(word);
        if (found) {
          console.log(`✓ '${word}' exists in dictionary`);
        } else {
          console.log(`✗ '${word}' not found in dictionary`);
        }
      }
      break;

    case "complete":
      if (args.length !== 1) {
        console.log("✗ Usage: complete <prefix>");
      } else {
        const prefix = args[0];
        const suggestions = trie.predictWords(prefix);
        if (suggestions.length > 0) {
          console.log(`Suggestions for '${prefix}': ${suggestions.join(", ")}`);
        } else {
          console.log(`No suggestions found for '${prefix}'`);
        }
      }
      break;

    case "help":
      console.log("Commands:");
      console.log("  add <word>        - Add word to dictionary");
      console.log("  find <word>       - Check if word exists");
      console.log("  complete <prefix> - Get completions");
      console.log("  help              - Show this message");
      console.log("  exit              - Quit program");
      break;

    case "exit":
      console.log("Goodbye!");
      rl.close();
      break;

    default:
      console.log(`✗ Unknown command: '${command}' (type 'help' for commands)`);
  }

  rl.prompt();
});

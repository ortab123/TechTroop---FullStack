const readline = require("readline");
const View = require("./view/view");
const TrieController = require("./controller/trieController");

const view = new View();
const controller = new TrieController(view);

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
  controller.handleCommand(command, args);
  rl.prompt();
});

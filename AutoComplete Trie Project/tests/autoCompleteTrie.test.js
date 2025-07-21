const AutoCompleteTrie = require("../src/autoCompleteTrie");

//addWord

test("addWord should create nodes for each character", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("cat");

  expect(trie.children["c"]).toBeDefined();
  expect(trie.children["c"].children["a"]).toBeDefined();
  expect(trie.children["c"].children["a"].children["t"]).toBeDefined();

  expect(trie.children["c"].children["a"].children["t"].endOfWord).toBeTruthy();
});

test("addWord should add word to the tree", () => {
  let trie = new AutoCompleteTrie();
  trie.addWord("cat");
  const bool = trie.findWord("cat");
  expect(bool).toBeTruthy();
});

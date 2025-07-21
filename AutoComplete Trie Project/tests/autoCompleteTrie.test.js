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

test("addWord should throw error for multiple words", () => {
  const trie = new AutoCompleteTrie();
  expect(() => {
    trie.addWord("persian cat");
  }).toThrow("Only single words allowed");
});

//findWord
test("findWord should find word in the tree", () => {
  let trie = new AutoCompleteTrie();
  trie.addWord("cat");
  const bool = trie.findWord("cat");
  expect(bool).toBeTruthy();
});

test("findWord should not find word in the tree", () => {
  let trie = new AutoCompleteTrie();
  trie.addWord("cat");
  const bool = trie.findWord("dog");
  expect(bool).toBeFalsy();
});

//_getRemainingTree
describe("_getRemainingTree", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    ["car", "card", "care", "cat"].forEach((word) => trie.addWord(word));
  });

  test("should return the node for existing prefix", () => {
    const node = trie._getRemainingTree("car", trie);
    expect(node).not.toBeNull();
    expect(node.value).toBe("r");
    expect(node.children["d"]).toBeDefined();
    expect(node.children["e"]).toBeDefined();
  });

  test("should return null for non-existing prefix", () => {
    const node = trie._getRemainingTree("cap", trie);
    expect(node).toBeNull();
  });

  test("should return root node for empty prefix", () => {
    const node = trie._getRemainingTree("", trie);
    expect(node).toBe(trie);
  });
});

//_allWordsHelper
describe("_allWordsHelper", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    ["car", "card", "care", "cat", "dog"].forEach((word) => trie.addWord(word));
  });

  test("should collect all words from a given node", () => {
    const node = trie._getRemainingTree("car", trie);
    const words = [];
    trie._allWordsHelper("car", node, words);

    expect(words.sort()).toEqual(["car", "card", "care"].sort());
  });

  test("should return empty if no words at node", () => {
    const node = trie._getRemainingTree("z", trie);
    const words = [];
    if (node) {
      trie._allWordsHelper("z", node, words);
    }
    expect(words).toEqual([]);
  });

  test("should collect one word if it's a full word", () => {
    const node = trie._getRemainingTree("dog", trie);
    const words = [];
    trie._allWordsHelper("dog", node, words);

    expect(words).toEqual(["dog"]);
  });
});

//predictWords

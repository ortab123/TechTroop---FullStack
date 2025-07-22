const AutoCompleteTrie = require("../src/models/autoCompleteTrie");

//validation
describe("Validation tests", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
  });

  test("addWord should throw error for non-alphabetic word", () => {
    expect(() => trie.addWord("hello!")).toThrow(
      "Only alphabetic characters allowed"
    );
    expect(() => trie.addWord("123abc")).toThrow(
      "Only alphabetic characters allowed"
    );
    expect(() => trie.addWord("good-day")).toThrow(
      "Only alphabetic characters allowed"
    );
  });

  test("findWord should throw error for non-alphabetic word", () => {
    trie.addWord("hello");
    expect(() => trie.findWord("hello!")).toThrow(
      "Only alphabetic characters allowed"
    );
  });

  test("predictWords should throw error for non-alphabetic prefix", () => {
    trie.addWord("hello");
    expect(() => trie.predictWords("hel!")).toThrow(
      "Only alphabetic characters allowed"
    );
  });
});

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

test("nodes should be reused for shared prefixes", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("cat");
  const aNodeBefore = trie.children["c"].children["a"];
  trie.addWord("car");
  const aNodeAfter = trie.children["c"].children["a"];

  expect(aNodeBefore).toBe(aNodeAfter);
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

test("findWord should return false for prefix that is not a full word", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("carpet");

  expect(trie.findWord("car")).toBeFalsy();
});

test("findWord should be case insensitive", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("Cat");
  expect(trie.findWord("cat")).toBeTruthy();
  expect(trie.findWord("CAT")).toBeTruthy();
});

//_getRemainingTree
describe("_getRemainingTree", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    ["car", "card", "care", "cat"].forEach((word) => trie.addWord(word));
  });

  test("_getRemainingTree should return the node for existing prefix", () => {
    const node = trie._getRemainingTree("car", trie);

    expect(node).not.toBeNull();
    expect(node.value).toBe("r");
    expect(node.children["d"]).toBeDefined();
    expect(node.children["e"]).toBeDefined();
  });

  test("_getRemainingTree should return null for non-existing prefix", () => {
    const node = trie._getRemainingTree("cap", trie);

    expect(node).toBeNull();
  });

  test("_getRemainingTree should return root node for empty prefix", () => {
    const node = trie._getRemainingTree("", trie);

    expect(node).toBe(trie);
  });

  test("_getRemainingTree should return null if prefix contains a character not in trie", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("hello");
    const node = trie._getRemainingTree("he@llo", trie);

    expect(node).toBeNull();
  });
});

//_allWordsHelper
describe("_allWordsHelper", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    ["car", "card", "care", "cat", "dog"].forEach((word) => trie.addWord(word));
  });

  test("_allWordsHelper should collect all words from a given node", () => {
    const node = trie._getRemainingTree("car", trie);
    const words = [];
    trie._allWordsHelper("car", node, words);

    expect(words.map((w) => w.word).sort()).toEqual(
      ["car", "card", "care"].sort()
    );
  });

  test("_allWordsHelper should return empty if no words at node", () => {
    const node = trie._getRemainingTree("z", trie);
    const words = [];
    if (node) {
      trie._allWordsHelper("z", node, words);
    }

    expect(words).toEqual([]);
  });

  test("_allWordsHelper should collect one word if it's a full word", () => {
    const node = trie._getRemainingTree("dog", trie);
    const words = [];
    trie._allWordsHelper("dog", node, words);

    expect(words.map((w) => w.word)).toEqual(["dog"]);
  });

  test("_allWordsHelper should not add incomplete paths", () => {
    const trie = new AutoCompleteTrie();
    trie.children["a"] = new AutoCompleteTrie("a");
    const words = [];
    trie._allWordsHelper("a", trie.children["a"], words);

    expect(words).toEqual([]);
  });

  test("_allWordsHelper collects words with correct frequency handling", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("code");
    trie.incrementUsage("code");
    trie.incrementUsage("code");

    const node = trie._getRemainingTree("code", trie);
    const words = [];
    trie._allWordsHelper("code", node, words);

    expect(words.map((w) => w.word)).toEqual(["code"]);
    expect(words[0].freq).toBe(2);
  });

  test("_allWordsHelper should default freq to 0 if undefined", () => {
    const trie = new AutoCompleteTrie();
    trie.children["x"] = new AutoCompleteTrie("x");
    trie.children["x"].endOfWord = true;

    const words = [];
    trie._allWordsHelper("x", trie.children["x"], words);

    expect(words[0]).toEqual({ word: "x", freq: 0 });
  });
});

//predictWords
describe("predictWords", () => {
  let trie;

  beforeEach(() => {
    trie = new AutoCompleteTrie();
    ["cat", "car", "care", "card", "dog", "do"].forEach((word) =>
      trie.addWord(word)
    );
  });

  test("predictWords should return all words with given prefix", () => {
    const result = trie.predictWords("ca").map((x) => x.word);
    expect(result.sort()).toEqual(["cat", "car", "care", "card"].sort());
  });

  test("predictWords should return empty array for non-existing prefix", () => {
    const result = trie.predictWords("zoo");
    expect(result).toEqual([]);
  });

  test("predictWords should return all words for empty prefix", () => {
    const result = trie.predictWords("").map((x) => x.word);
    expect(result.sort()).toEqual(
      ["cat", "car", "care", "card", "dog", "do"].sort()
    );
  });

  test("predictWords should return full word when prefix is a complete word", () => {
    const result = trie.predictWords("dog");
    expect(result).toEqual([{ word: "dog", freq: 0 }]);
  });

  test("predictWords should return words for single-letter prefix", () => {
    const result = trie.predictWords("d").map((x) => x.word);
    expect(result.sort()).toEqual(["dog", "do"].sort());
  });

  test("predictWords should be case insensitive", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("Cat");
    const result = trie.predictWords("C").map((x) => x.word);
    expect(result).toContain("cat");
  });

  test("predictWords should return words sorted by frequency", () => {
    trie.incrementUsage("car");
    trie.incrementUsage("car");
    trie.incrementUsage("cat");

    const result = trie.predictWords("ca");
    expect(result.map((x) => x.word)).toEqual(["car", "cat", "care", "card"]);
    expect(result.map((x) => x.freq)).toEqual([2, 1, 0, 0]);
  });

  test("predictWords should return same words if all frequencies are zero", () => {
    const result = trie.predictWords("ca").map((x) => x.word);
    expect(result.sort()).toEqual(["cat", "car", "care", "card"].sort());
  });

  test("predictWords should return most used word first when prefix is full word", () => {
    trie.incrementUsage("card");
    trie.incrementUsage("card");
    trie.incrementUsage("card");
    trie.incrementUsage("car");

    const result = trie.predictWords("car");
    expect(result.map((x) => x.word)).toEqual(["card", "car", "care"]);
    expect(result.map((x) => x.freq)).toEqual([3, 1, 0]);
  });
});

//incrementUsage
test("incrementUsage increments existing word frequency", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("cat");
  const freq1 = trie.incrementUsage("cat");
  const freq2 = trie.incrementUsage("cat");
  expect(freq1).toBe(1);
  expect(freq2).toBe(2);
});

test("incrementUsage throws error for word not in trie", () => {
  const trie = new AutoCompleteTrie();
  expect(() => trie.incrementUsage("dog")).toThrow(
    "'dog' does not exist in dictionary"
  );
});

test("incrementUsage throws error for non-alphabetic word", () => {
  const trie = new AutoCompleteTrie();
  expect(() => trie.incrementUsage("c@t")).toThrow(
    "Only alphabetic characters allowed"
  );
});

test("incrementUsage throws if word is only a prefix, not a full word", () => {
  const trie = new AutoCompleteTrie();
  trie.addWord("cat");
  trie.children["c"].children["a"] = new AutoCompleteTrie("a");
  expect(() => trie.incrementUsage("ca")).toThrow(
    "'ca' does not exist in dictionary"
  );
});

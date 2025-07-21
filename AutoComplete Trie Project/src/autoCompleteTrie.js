class AutoCompleteTrie {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
    if (word.includes(" ")) {
      throw new Error("Only single words allowed");
    }

    let currentNode = this;
    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new AutoCompleteTrie(char);
        currentNode = currentNode.children[char];
      } else {
        currentNode = currentNode.children[char];
      }
    }
    currentNode.endOfWord = true;
  }

  findWord(word) {
    let currentNode = this;
    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }

    return currentNode.endOfWord;
  }

  predictWords(prefix) {
    const currentNode = this._getRemainingTree(prefix, this);
    if (!currentNode) return [];

    const allWords = [];
    this._allWordsHelper(prefix, currentNode, allWords);
    return allWords;
  }

  _getRemainingTree(prefix, node) {
    let currentNode = node;
    for (let char of prefix) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return null;
      }
    }

    return currentNode;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push(prefix);
    }

    for (let char in node.children) {
      const child = node.children[char];
      this._allWordsHelper(prefix + char, child, allWords);
    }
  }
}

module.exports = AutoCompleteTrie;

// const trie = new AutoCompleteTrie();

// const wordsToAdd = ["cat", "car", "card", "care", "dog", "doom"];
// wordsToAdd.forEach((word) => trie.addWord(word));

// console.log(trie.predictWords("ca")); // ["cat", "car", "card", "care"]
// console.log(trie.predictWords("car")); // ["car", "card", "care"]
// console.log(trie.predictWords("do")); // ["dog", "doom"]
// console.log(trie.predictWords("cat")); // ["cat"]
// console.log(trie.predictWords("z")); // []

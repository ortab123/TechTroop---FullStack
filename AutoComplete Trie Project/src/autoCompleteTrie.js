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

    if (!/^[a-zA-Z]*$/.test(word)) {
      throw new Error("Only alphabetic characters allowed");
    }

    word = word.toLowerCase();
    let currentNode = this;

    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new AutoCompleteTrie(char);
        currentNode = currentNode.children[char];
      } else {
        currentNode = currentNode.children[char];
      }
    }

    if (currentNode.frequency === undefined) {
      currentNode.frequency = 0;
    }
    currentNode.endOfWord = true;
  }

  findWord(word) {
    if (!/^[a-zA-Z]*$/.test(word)) {
      throw new Error("Only alphabetic characters allowed");
    }

    word = word.toLowerCase();
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
    if (!/^[a-zA-Z]*$/.test(prefix)) {
      throw new Error("Only alphabetic characters allowed");
    }

    prefix = prefix.toLowerCase();
    const currentNode = this._getRemainingTree(prefix, this);

    if (!currentNode) return [];

    const allWords = [];
    this._allWordsHelper(prefix, currentNode, allWords);
    return allWords;
  }

  _getRemainingTree(prefix, node) {
    prefix = prefix.toLowerCase();
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

  incrementUsage(word) {
    if (!/^[a-zA-Z]+$/.test(word)) {
      throw new Error("Only alphabetic characters allowed");
    }

    word = word.toLowerCase();
    let currentNode = this;

    for (let char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        throw new Error(`'${word}' does not exist in dictionary`);
      }
    }

    if (!currentNode.endOfWord) {
      throw new Error(`'${word}' does not exist in dictionary`);
    }

    currentNode.frequency++;
    return currentNode.frequency;
  }
}

module.exports = AutoCompleteTrie;

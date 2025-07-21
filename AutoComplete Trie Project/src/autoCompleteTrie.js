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

    currentNode.endOfWord = true;

    if (typeof currentNode.frequency !== "number") {
      currentNode.frequency = 0;
    }
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

    const allWordsWithFreq = [];
    this._allWordsHelper(prefix, currentNode, allWordsWithFreq);
    allWordsWithFreq.sort((a, b) => b.freq - a.freq);

    return allWordsWithFreq;
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
      allWords.push({
        word: prefix,
        freq: node.frequency ?? 0,
      });
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

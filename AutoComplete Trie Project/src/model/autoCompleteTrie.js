class AutoCompleteTrie {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
    word = this._prepareWord(word, false);
    let currentNode = this;

    for (let char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new AutoCompleteTrie(char);
      }
      currentNode = currentNode.children[char];
    }

    currentNode.endOfWord = true;

    if (typeof currentNode.frequency !== "number") {
      currentNode.frequency = 0;
    }
  }

  findWord(word) {
    word = this._prepareWord(word);
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
    prefix = this._prepareWord(prefix);
    const currentNode = this._getRemainingTree(prefix, this);

    if (!currentNode) return [];

    const allWordsWithFreq = [];
    this._allWordsHelper(prefix, currentNode, allWordsWithFreq);
    allWordsWithFreq.sort((a, b) => b.freq - a.freq);

    return allWordsWithFreq;
  }

  incrementUsage(word) {
    word = this._prepareWord(word);
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

  countWords() {
    let count = 0;

    function dfs(node) {
      if (node.endOfWord) count++;
      for (const child of Object.values(node.children)) {
        dfs(child);
      }
    }

    dfs(this);
    return count;
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

  _prepareWord(str, allowSpaces = false) {
    if (!allowSpaces && str.includes(" ")) {
      throw new Error("Only single words allowed");
    }

    this._validateAlphaOnly(str.replace(/\s+/g, ""));
    return str.toLowerCase();
  }

  _validateAlphaOnly(str) {
    if (!/^[a-zA-Z]*$/.test(str)) {
      throw new Error("Only alphabetic characters allowed");
    }
  }
}

export default AutoCompleteTrie;

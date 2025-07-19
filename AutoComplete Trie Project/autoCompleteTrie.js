class AutoCompleteTrie {
  constructor(value, children, endOfWord) {
    this.value = "";
    this.children = {};
    this.endOfWord = false;
  }

  addWord(word) {
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

  predictWords(prefix) {}

  _getRemainingTree(prefix, node) {
    //used by predictWords
  }

  _allWordsHelper(prefix, node, allWords) {}
}

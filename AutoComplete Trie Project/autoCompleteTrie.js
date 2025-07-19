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

  predictWords(prefix) {
    let currentNode = this;
    for (let char of prefix) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return [];
      }
    }

    const allWords = [];
    this._allWordsHelper(prefix, currentNode, allWords);
    return allWords;
  }

  _getRemainingTree(prefix, node) {
    //used by predictWords
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

const trie = new AutoCompleteTrie();

const wordsToAdd = ["cat", "car", "card", "care", "dog", "doom"];
wordsToAdd.forEach((word) => trie.addWord(word));

console.log(trie.predictWords("ca")); // ["cat", "car", "card", "care"]
console.log(trie.predictWords("car")); // ["car", "card", "care"]
console.log(trie.predictWords("do")); // ["dog", "doom"]
console.log(trie.predictWords("cat")); // ["cat"]
console.log(trie.predictWords("z")); // []

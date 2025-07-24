import AutoCompleteTrie from "../model/autoCompleteTrie.js";

const trie = new AutoCompleteTrie();

const trieWebController = {
  addWord(word) {
    if (trie.findWord(word)) {
      throw new Error(`'${word}' already exists in dictionary`);
    }

    trie.addWord(word);
  },

  getWordCount() {
    return trie.countWords();
  },

  getSuggestions(prefix) {
    return trie.predictWords(prefix).map((obj) => obj.word);
  },

  useWord(word) {
    return trie.incrementUsage(word);
  },
};

export default trieWebController;

import AutoCompleteTrie from "../model/autoCompleteTrie.js";

const trie = new AutoCompleteTrie();

const trieWebController = {
  addWord(word) {
    trie.addWord(word);
    console.log(trie.countWords());
  },

  getWordCount() {
    return trie.countWords();
  },
};

export default trieWebController;

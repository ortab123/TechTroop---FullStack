# 🔤 AutoComplete Trie Project

A simple and efficient implementation of an **AutoComplete system using a Trie data structure**, written in JavaScript.  
Supports word insertion, lookup, usage tracking (frequency), and intelligent prefix-based predictions.

---

## 📁 Project Structure

```
autocomplete-project/
│
├── src/
│ ├── autoCompleteTrie.js
│ └── app.js
│
├── tests/
│ └── autoCompleteTrie.test.js
│
├── package.json
└── README.md
```

---

## 🚀 Features

- Add words to the Trie
- Predict words based on prefix (sorted by usage frequency)
- Increment word frequency when used
- Case-insensitive behavior
- Validates inputs (only alphabetic characters)
- Fully tested with 100% coverage

---

## 🧪 Testing

This project uses **Jest** for unit testing.

To run the tests:

```bash
npm install
npx jest --coverage
You should see:

Test Suites: 1 passed, 1 total
Tests:       34 passed, 34 total
Coverage:    100% statements, 100% branches, 100% functions, 100% lines

✅ Example Usage
const AutoCompleteTrie = require('./autoCompleteTrie');

const trie = new AutoCompleteTrie();
trie.addWord("cat");
trie.addWord("car");
trie.incrementUsage("cat");

console.log(trie.predictWords("ca"));
// → [{ word: "cat", freq: 1 }, { word: "car", freq: 0 }]

🛡️ Validation
Only alphabetic characters are allowed.
Spaces are not allowed in addWord.
Errors are thrown on invalid operations.
```

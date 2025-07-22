# 🔤 AutoComplete Trie Project (MVC Architecture)

An efficient and modular **AutoComplete system** built in **JavaScript**, using a **Trie data structure**  
and following the **MVC (Model-View-Controller)** architectural pattern.

---

## 📁 Project Structure

```
autocomplete-project/
├── src/
│   ├── models/
│   │   └── autoCompleteTrie.js      ← Trie logic (Model)
│   ├── views/
│   │   └── view.js                  ← CLI output handling (View)
│   ├── controllers/
│   │   └── trieController.js       ← Command handler (Controller)
│   └── app.js                      ← CLI Entry point
│
├── tests/
│   ├── autoCompleteTrie.test.js    ← Unit tests for Model
│   ├── view.test.js                ← Unit tests for View (mocked)
│   └── trieController.test.js      ← Unit tests for Controll(mocked)
│
├── package.json
└── README.md
```

## 🚀 Features

- ✅ Add words to the dictionary
- ✅ Predict words by prefix (sorted by usage frequency)
- ✅ Track word usage via `incrementUsage`
- ✅ Full input validation (alphabetic-only, single-word)
- ✅ Case-insensitive
- ✅ Clean MVC structure (Model-View-Controller)
- ✅ Fully unit-tested (Model, View, Controller)

---

## 🧠 Architecture Overview

| Layer      | Responsibility                         |
| ---------- | -------------------------------------- |
| Model      | Trie data structure & word logic       |
| View       | Handels CLI output (console.log)       |
| Controller | Receives user commands and routes them |
| App        | Entry point (CLI interface + readline) |

---

## 🧪 Testing

This project uses **Jest** for unit testing.

To run tests with coverage:

```bash
npm install
npx jest --coverage

Test Suites: 3 passed, 3 total
Tests:       45+ passed
Coverage:    100% statements, 100% branches, 100% functions, 100% lines
```

## 🛡️ Validation Rules

- Only **alphabetic characters** are allowed (`a-z`, `A-Z`)
- Spaces are **not allowed** in `addWord`
- Errors are thrown on:
  - Invalid characters (e.g. `"he!llo"`)
  - Prefixes that are not complete words (e.g. `incrementUsage("ca")`)
  - Using non-existing words

## 📌 Run the CLI App

```bash
node src/app.js
```

### 🧪 Example CLI commands:

```bash
add hello
find hello
complete he
use hello
help
exit
```

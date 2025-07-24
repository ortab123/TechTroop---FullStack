# 🔤 AutoComplete Trie Project (MVC Architecture)

An efficient and modular AutoComplete system built in JavaScript, using a Trie data structure
and following the MVC (Model-View-Controller) architectural pattern.

✨ This project supports two usage modes:

Command-Line Interface (CLI) for terminal-based interaction.

Web UI with an interactive search box, ranked suggestions, and real-time feedback.

---

## 📁 Project Structure

```
autocomplete-project/
├── src/
│   ├── model/
│   │   └── autoCompleteTrie.js       ← Trie logic(Model)
│   ├── view/
│   │   ├── view.js                   ← CLI output handling (View)
│   │   └── domView.js                ← Web UI view logic
│   ├── controller/
│   │   ├── trieController.js         ← CLI command handler (Controller)
│   │   └── trieWebController.js      ← Web UI controller
│   ├── app.js                        ← CLI entry point
│   └── index.html                    ← Web UI HTML entry point
│
├── tests/
│   ├── autoCompleteTrie.test.js      ← Unit tests for Model
│   ├── view.test.js                  ← Unit tests for CLI View (mocked)
│   └── trieController.test.js        ← Unit tests for CLI Controller (mocked)
│
├── package.json
└── README.md
```

## 🚀 Features

🔍 Prefix-based suggestions using Trie traversal
📈 Ranked suggestions based on word usage frequency
➕ Add new words dynamically
❌ Duplicate word detection
✅ Visual feedback (success/error messages)
🧪 Unit tested components for CLI

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

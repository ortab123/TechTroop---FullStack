const TrieController = require("../src/controllers/trieController");
const AutoCompleteTrie = require("../src/models/autoCompleteTrie");

jest.mock("../src/models/autoCompleteTrie");

describe("TrieController tests with mock View", () => {
  let controller;
  let viewMock;

  beforeEach(() => {
    viewMock = {
      showMessage: jest.fn(),
      showError: jest.fn(),
      showSuggestions: jest.fn(),
      showHelp: jest.fn(),
    };

    AutoCompleteTrie.mockClear();
    controller = new TrieController(viewMock);
  });

  test("handleCommand should call addWord and showMessage", () => {
    controller.trie.addWord = jest.fn();

    controller.handleCommand("add", ["cat"]);

    expect(controller.trie.addWord).toHaveBeenCalledWith("cat");
    expect(viewMock.showMessage).toHaveBeenCalledWith(
      "✓ Added 'cat' to dictionary\n"
    );
  });

  test("handleCommand should call findWord and showMessage - word found", () => {
    controller.trie.findWord = jest.fn().mockReturnValue(true);

    controller.handleCommand("find", ["cat"]);

    expect(viewMock.showMessage).toHaveBeenCalledWith(
      "✓ 'cat' exists in dictionary\n"
    );
  });

  test("handleCommand should call findWord and showMessage - word not found", () => {
    controller.trie.findWord = jest.fn().mockReturnValue(false);

    controller.handleCommand("find", ["dog"]);

    expect(viewMock.showMessage).toHaveBeenCalledWith(
      "✗ 'dog' not found in dictionary\n"
    );
  });

  test("handleCommand should call predictWords and showSuggestions", () => {
    const mockResults = [
      { word: "cat", freq: 2 },
      { word: "car", freq: 1 },
    ];
    controller.trie.predictWords = jest.fn().mockReturnValue(mockResults);

    controller.handleCommand("complete", ["ca"]);

    expect(viewMock.showSuggestions).toHaveBeenCalledWith("ca", mockResults);
  });

  test("handleCommand should call incrementUsage and showMessage", () => {
    controller.trie.incrementUsage = jest.fn().mockReturnValue(3);

    controller.handleCommand("use", ["cat"]);

    expect(controller.trie.incrementUsage).toHaveBeenCalledWith("cat");
    expect(viewMock.showMessage).toHaveBeenCalledWith(
      "✓ Increment usage for 'cat' (now 3)\n"
    );
  });

  test("handleCommand should call showHelp for 'help'", () => {
    controller.handleCommand("help", []);
    expect(viewMock.showHelp).toHaveBeenCalled();
  });

  test("handleCommand should call showMessage for unknown command", () => {
    controller.handleCommand("foo", []);
    expect(viewMock.showMessage).toHaveBeenCalledWith(
      "✗ Unknown command: 'foo'\n"
    );
  });

  test("addWord should call showError if addWord fails", () => {
    controller.trie.addWord = jest.fn(() => {
      throw new Error("Invalid");
    });

    controller.handleCommand("add", ["bad!"]);

    expect(viewMock.showError).toHaveBeenCalledWith(expect.any(Error));
    expect(viewMock.showError.mock.calls[0][0].message).toBe("Invalid");
  });

  test("handleCommand should show invalid usage if args missing", () => {
    controller.handleCommand("add", []);
    expect(viewMock.showMessage).toHaveBeenCalledWith("✗ Invalid usage\n");
  });

  test("handleCommand should call showMessage and exit for 'exit'", () => {
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {});

    controller.handleCommand("exit", []);

    expect(viewMock.showMessage).toHaveBeenCalledWith("Goodbye!");
    expect(exitSpy).toHaveBeenCalledWith(0);

    exitSpy.mockRestore();
  });
});

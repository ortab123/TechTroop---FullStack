const View = require("../src/views/view");

describe("View tests (console.log mocked)", () => {
  let view;
  let consoleSpy;

  beforeEach(() => {
    view = new View();
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test("showMessage should log message", () => {
    view.showMessage("Hello");
    expect(consoleSpy).toHaveBeenCalledWith("Hello");
  });

  test("showError should log error message", () => {
    view.showError(new Error("Something went wrong"));
    expect(consoleSpy).toHaveBeenCalledWith("✗ Something went wrong\n");
  });

  test("showError should handle plain string errors", () => {
    view.showError("Invalid input");
    expect(consoleSpy).toHaveBeenCalledWith("✗ Invalid input\n");
  });

  test("showSuggestions should log suggestions when present", () => {
    const suggestions = [
      { word: "cat", freq: 2 },
      { word: "car", freq: 1 },
    ];
    view.showSuggestions("ca", suggestions);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Suggestions for 'ca': cat (2), car (1)\n"
    );
  });

  test("showSuggestions should log message when no suggestions", () => {
    view.showSuggestions("xy", []);
    expect(consoleSpy).toHaveBeenCalledWith("No suggestions found for 'xy'\n");
  });

  test("showHelp should log help instructions", () => {
    view.showHelp();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Commands:")
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("add <word>")
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("exit"));
  });
});

const fs = require("fs");

function readFileWithErrorHandling(filePath, callBack) {
  try {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          callBack(`✗ File not found: ${filePath}`);
        } else if (err.code === "EISDIR") {
          callBack(`✗ Path is a directory, not a file: ${filePath}`);
        } else {
          callBack(`✗ Error reading file: ${err.message}`);
        }
      } else {
        callBack(`✓ File read successfully. Size: ${data.length} bytes`);
      }
    });
  } catch (error) {
    callBack(`✗ Unexpected error: ${error.message}`);
  }
}

module.exports = readFileWithErrorHandling;

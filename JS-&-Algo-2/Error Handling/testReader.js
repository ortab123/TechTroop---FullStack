const readFileWithErrorHandling = require("./file-reader.js");

readFileWithErrorHandling("existing.txt", console.log);
readFileWithErrorHandling("nofile.txt", console.log);
readFileWithErrorHandling(".", console.log);

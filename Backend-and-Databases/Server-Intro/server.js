const http = require("http");

const server = http.createServer(function (request, response) {
  const name = "Or";
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write(`Hello, I'm ${name}`);
  response.end();
});

const port = 3000;
server.listen(port, function () {
  console.log(`Node server created at port ${port}`);
});

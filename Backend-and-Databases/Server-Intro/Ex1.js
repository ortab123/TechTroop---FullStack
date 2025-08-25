const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.setHeader("Content-Type", "text/plain");

  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end("Welcome to my server");
  } else if (req.method === "GET" && req.url === "/about") {
    res.statusCode === 200;
    res.end("This is the about page");
  } else if (req.method === "GET" && req.url === "/contact") {
    res.statusCode = 200;
    res.end("You can contact me at = example@example.com");
  } else {
    res.statusCode = 404;
    res.end("404 - Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

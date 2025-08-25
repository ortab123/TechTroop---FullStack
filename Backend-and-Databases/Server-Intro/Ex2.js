const http = require("http");

let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const urlParts = req.url.split("/").filter(Boolean);

  if (req.method === "GET" && req.url === "/api/users") {
    sendJSON(res, 200, users);
  } else if (
    req.method === "GET" &&
    urlParts[0] === "api" &&
    urlParts[1] === "users" &&
    urlParts[2]
  ) {
    const userId = parseInt(urlParts[2]);
    const user = users.find((u) => u.id === userId);

    if (user) {
      sendJSON(res, 200, user);
    } else {
      sendJSON(res, 404, { error: "User not found" });
    }
  } else if (req.method === "POST" && req.url === "/api/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);

        if (!newUser.name || !newUser.email) {
          return sendJSON(res, 400, { error: "Name and email are required" });
        }

        const id = users.length ? users[users.length - 1].id + 1 : 1;
        const user = { id, ...newUser };
        users.push(user);

        sendJSON(res, 201, user);
      } catch (err) {
        sendJSON(res, 400, { error: "Invalid JSON" });
      }
    });
  } else {
    sendJSON(res, 404, { error: "Endpoint not found" });
  }
});

server.listen(3000, () => {
  console.log("REST API server running at http://localhost:3000");
});

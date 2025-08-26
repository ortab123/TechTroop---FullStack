const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

const store = [
  { name: "table", inventory: 3, price: 800 },
  { name: "chair", inventory: 16, price: 120 },
  { name: "couch", inventory: 1, price: 1200 },
  { name: "picture frame", inventory: 31, price: 70 },
];

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join("dist", "index.html"));
});

app.get("/priceCheck/:itemName", (req, res) => {
  let itemName = req.params.itemName;
  const item = store.find((i) => i.name === itemName);

  if (item) {
    res.send({ price: item.price });
  } else {
    res.send({ price: null });
  }
});

app.get("/buy/:itemName", (req, res) => {
  let itemName = req.params.itemName;
  const item = store.find((i) => i.name === itemName);

  if (!item) {
    return res.send({ error: "Item not found" });
  }

  if (item.inventory <= 0) {
    return res.send({ error: "Item is out of stock" });
  }

  item.inventory--;
  res.send(item);
});

app.get("/sale", (req, res) => {
  const admin = req.query.admin;

  if (admin === "true") {
    store.forEach((item) => {
      if (item.inventory > 10) {
        item.price = item.price / 2;
      }
    });
  }

  res.send(store);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

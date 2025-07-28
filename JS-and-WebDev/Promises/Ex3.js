const inventory = {
  laptop: { price: 999, stock: 5 },
  mouse: { price: 25, stock: 10 },
  keyboard: { price: 75, stock: 0 }, // Out of stock
  monitor: { price: 299, stock: 3 },
};

function checkInventory(items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let item of items) {
        if (!inventory[item] || inventory[item].stock <= 0) {
          return reject(`${item} is out of stock`);
        }
      }
      resolve(items);
    }, 500);
  });
}

function calculateTotal(items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const unavailable = items.find((item) => !inventory[item]);
      if (unavailable) {
        return reject(`${unavailable} is not available`);
      }

      const subtotal = items.reduce(
        (sum, item) => sum + inventory[item].price,
        0
      );
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      resolve({ subtotal, tax, total });
    }, 200);
  });
}

function processPayment(amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.9) {
        return reject(new Error(`Payment of $${amount} failed`));
      } else {
        const transactionId = `txn_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        resolve({ transactionId, amount, status: "success" });
      }
    }, 1500);
  });
}

function updateInventory(items) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let item of items) {
        const product = inventory[item];

        if (!product) {
          return reject(new Error(`${item} is not found in inventory`));
        }

        if (product.stock < 1) {
          return reject(new Error(`${item} is out of stock`));
        }
      }

      for (let item of items) {
        inventory[item].stock -= 1;
      }

      resolve(inventory);
    }, 300);
  });
}

async function checkout(itemNames) {
  try {
    const available = await checkInventory(itemNames);
    const totals = await calculateTotal(itemNames);
    const payment = await processPayment(totals.total);
    await updateInventory(itemNames);

    return {
      message: "Order completed successfully",
      items: itemNames,
      total: totals,
      payment,
    };
  } catch (err) {
    throw new Error(`Checkout failed: ${err.message || err}`);
  }
}

// Test cases:
checkout(["laptop", "mouse"]) // Should succeed
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));

checkout(["laptop", "keyboard"]) // Should fail - keyboard out of stock
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));

checkout(["monitor", "mouse", "laptop"]) // Might fail at payment (10% chance)
  .then((result) => console.log("Order success:", result))
  .catch((error) => console.log("Order failed:", error.message));

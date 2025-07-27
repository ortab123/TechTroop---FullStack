//Ex1
function checkLuckyNumber(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num <= 0) {
        reject(new Error("Invalid number"));
      } else if (num % 7 === 0) {
        resolve("Lucky!");
      } else {
        resolve("Not lucky");
      }
    }, 800);
  });
}

checkLuckyNumber(14)
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));

checkLuckyNumber(10)
  .then((result) => console.log(result))
  .catch((err) => console.error(err.message));

checkLuckyNumber(-5)
  .then((result) => console.log(result))
  .catch((err) => console.error(err.message));

//Ex2
function processFile(filename, processingTime) {
  return new Promise((resolve, reject) => {
    console.log(`Starting to process ${filename}...`);

    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error(`Failed to process ${filename}`));
      } else {
        const result = {
          filename: filename,
          size: Math.floor(Math.random() * 1000) + 100,
          processedAt: new Date().toLocaleTimeString(),
        };
        console.log(`✓ Completed ${filename}`);
        resolve(result);
      }
    }, processingTime);
  });
}

// TODO: Use Promise.all() to process these files concurrently:
const files = [
  { name: "document1.pdf", time: 2000 },
  { name: "image1.jpg", time: 1500 },
  { name: "data.csv", time: 3000 },
  { name: "report.docx", time: 1000 },
];

const promises = files.map((file) => processFile(file.name, file.time));
const startTime = Date.now();

Promise.all(promises)
  .then((results) => {
    const totalTime = (Date.now() - startTime) / 1000;
    console.log(`✓  All files processed in ${totalTime.toFixed(2)} seconds`);
    console.log("Results:", results);
  })
  .catch((error) => {
    console.error("✗ Error during file processing:", error.message);
  });

// Promise.allSettled(promises).then((results) => {
//   console.log("🔍 AllSettled results:");
//   results.forEach((result, i) => {
//     const file = files[i].name;
//     if (result.status === "fulfilled") {
//       console.log(`✓ ${file} succeeded`, result.value);
//     } else {
//       console.log(`✗ ${file} failed`, result.reason.message);
//     }
//   });
// });

//Ex3
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
  // TODO: Return a promise that:
  // 1. Waits 1500ms (simulating payment processing)
  // 2. 90% success rate
  // 3. Resolves with { transactionId, amount, status: 'success' }
  // 4. Rejects with payment failure error
}

function updateInventory(items) {
  // TODO: Return a promise that:
  // 1. Waits 300ms
  // 2. Reduces stock for each item
  // 3. Resolves with updated inventory status
}

// TODO: Create a complete checkout function that:
// 1. Takes an array of item names
// 2. Chains all the above functions
// 3. Returns a promise with the final order result
// 4. Handles all possible errors appropriately

function checkout(itemNames) {
  // TODO: Implement the complete checkout flow
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

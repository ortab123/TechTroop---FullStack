const { getBalance, deposit, withdraw } = require("./banking");

const promptSync = require("prompt-sync");
const prompt = promptSync();

const displayMenu = () => {
  console.log(`=== Banking System ===
1) Check Balance
2) Deposit Money
3) Withdraw Money
4) Exit`);
};

function getUserChoice() {
  const input = prompt("Choose option (1-4): ");
  return input;
}

const getAmountInput = (actionText) => {
  return prompt(`Enter amount to ${actionText}: `);
};

const displayBalance = (balance) => {
  console.log(`Current balance: ${balance}`);
};

const displayMessage = (message) => {
  console.log(message);
};

module.exports = {
  displayMenu,
  getUserChoice,
  getAmountInput,
  displayBalance,
  displayMessage,
};

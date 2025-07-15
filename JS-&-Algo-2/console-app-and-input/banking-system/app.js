console.log("Starting banking system...");
const banking = require("./banking");
const ui = require("./ui");

function handleChoise(choice) {
  switch (choice) {
    case "1":
      handleBalance();
      return true;
    case "2":
      handleDeposit();
      return true;
    case "3":
      handleWithdraw();
      return true;
    case "4":
      ui.displayMessage("Exiting... Goodbye!");
      return false;
    default:
      ui.displayMessage("✗ Invalid option. Please choose 1-4.");
      return true;
  }
}

function handleBalance() {
  const balance = banking.getBalance();
  ui.displayBalance(balance);
}

function handleDeposit() {
  const rawAmount = ui.getAmountInput("deposit");

  const currencySymbolMatch = rawAmount.match(/[^0-9.\s]/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : "$";

  const amount = parseFloat(rawAmount.replace(/[^0-9.]/g, ""));

  if (!isNaN(amount) && amount > 0) {
    const newBalance = banking.deposit(amount);
    ui.displayBalance(`${currencySymbol}${newBalance}`);
  } else {
    ui.displayMessage("✗ Please enter a valid positive amount.");
  }
}

function handleWithdraw() {
  const rawAmount = ui.getAmountInput("withdraw");

  const currencySymbolMatch = rawAmount.match(/[^0-9.\s]/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] : "$";

  const amount = parseFloat(rawAmount.replace(/[^0-9.]/g, ""));

  if (!isNaN(amount) && amount > 0) {
    const newBalance = banking.withdraw(amount);
    ui.displayBalance(`${currencySymbol}${newBalance}`);
  } else {
    ui.displayMessage("✗ Please enter a valid positive amount.");
  }
}

let isRunning = true;

while (isRunning) {
  ui.displayMenu();
  const choise = ui.getUserChoice();
  isRunning = handleChoise(choise);
}

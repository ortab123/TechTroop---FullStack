let currentBalance = 0;

function getBalance() {
  return currentBalance;
}

function deposit(amount) {
  return (currentBalance += amount);
}

function withdraw(amount) {
  if (amount > currentBalance) {
    console.log(
      `Your currentBalance :${currentBalance} is less than the amount of money you want to withdraw.`
    );
  } else {
    return (currentBalance -= amount);
  }
}

module.exports = { getBalance, deposit, withdraw };

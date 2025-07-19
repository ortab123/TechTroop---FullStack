const bankModule = function () {
  let money = 500;

  const depositCash = (cashAmount) => {
    money += cashAmount;
  };

  const checkBalance = () => {
    console.log(money);
  };

  return {
    deposit: depositCash,
    showBalance: checkBalance,
  };
};

export default bankModule;

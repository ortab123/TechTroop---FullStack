//Ex1
const person = {
  hungry: true,

  feed: function () {
    if (this.hungry) {
      hungry = false;
      console.log("Im no longer hungry!");
    }
  },
};

person.feed();

//Ex2
const pump = function (amount) {
  this.liters += amount;
  console.log("You put " + amount + " liters in " + this.name);
};

const garage = {
  car1: {
    name: "Audi",
    liters: 3,
    fillTank: pump,
  },
  car2: {
    name: "Mercedes",
    liters: 1,
    fillTank: pump,
  },
};

garage.car1.fillTank(2);
console.log("Audi should have 5 liters: ", garage.car1.liters);

garage.car2.fillTank(30);
console.log("Mercedes should have 31 liters: ", garage.car2.liters);

//Ex3
const pumpFuel = function (plane) {
  plane.fuel += 1;
};

const airplane = {
  fuel: 0,
  fly: function () {
    if (this.fuel < 2) {
      return "on the ground!";
    } else {
      return "flying!";
    }
  },
};

console.log("The plane should not be able to fly (yet): " + airplane.fly());

pumpFuel(airplane);
console.log("The plane should STILL not be able to fly: " + airplane.fly());

pumpFuel(airplane);
console.log("Take off! " + airplane.fly());

//Ex4
const tipJar = {
  coinCount: 20,
  tip: function () {
    this.coinCount += 1;
  },
  stealCoins: function (num) {
    this.coinCount -= num;
  },
};

tipJar.tip();
console.log("Tip jar should have 21 coins: " + tipJar.coinCount);

tipJar.stealCoins(3);
console.log("Tip jar should have 18 coins: " + tipJar.coinCount);

tipJar.stealCoins(10);
console.log("Tip jar should have 8 coins: " + tipJar.coinCount);

//Ex5
const revealSecret = function () {
  return this.secret;
};

const shoutIt = function (person, func) {
  person.revealItAll = func;
  const result = person.revealItAll();
  console.log(person.name + " said: " + result);
};

const avi = {
  name: "Avi",
  secret: "Im scared of snakes!",
};

const narkis = {
  name: "Narkis",
  secret: "I don't have secrets because I'm zen like that.",
};

shoutIt(avi, revealSecret);
shoutIt(narkis, revealSecret);

//Ex6
const coffeeShop = {
  beans: 40,

  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12,
  },

  makeDrink: function (drinkType) {
    if (drinkType in this.drinkRequirements) {
      const requiredBeans = this.drinkRequirements[drinkType];

      if (this.beans >= requiredBeans) {
        this.beans -= requiredBeans;
      } else {
        console.log("Sorry, we're all out of beans");
      }
    } else {
      console.log("Sorry, we don't make " + drinkType);
    }
  },
};

coffeeShop.makeDrink("latte");
coffeeShop.makeDrink("americano");
coffeeShop.makeDrink("filtered");
coffeeShop.makeDrink("doubleShot");
coffeeShop.makeDrink("frenchPress");

//Ex6.1
const coffeeShop1 = {
  beans: 40,
  money: 100,

  drinkRequirements: {
    latte: 10,
    americano: 5,
    doubleShot: 15,
    frenchPress: 12,
  },

  buyBeans: function (numBeans) {
    const costPerBean = 2;
    const totalCost = numBeans * costPerBean;
    if (this.money >= totalCost) {
      this.money -= totalCost;
      this.beans += numBeans;
    } else {
      console.log("There is not enough money to buy beans.");
    }
  },

  makeDrink: function (drinkType) {
    if (!(drinkType in this.drinkRequirements)) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }

    const requiredBeans = this.drinkRequirements[drinkType];

    if (this.beans < requiredBeans) {
      console.log("Sorry, we're all out of beans!");
      return;
    }

    this.beans -= requiredBeans;
  },
};

coffeeShop1.money = 100;
coffeeShop1.beans = 10;

coffeeShop1.buyBeans(20);
console.log(coffeeShop1.money);
console.log(coffeeShop1.beans);

//Ex6.2
const coffeeShop2 = {
  beans: 40,
  money: 100,

  drinkRequirements: {
    latte: { beanRequirement: 10, price: 5 },
    americano: { beanRequirement: 5, price: 3 },
    doubleShot: { beanRequirement: 15, price: 8 },
    frenchPress: { beanRequirement: 12, price: 7 },
  },

  buyDrink: function (drinkType) {
    const drink = this.drinkRequirements[drinkType];
    if (!drink) {
      console.log("Sorry, we don't make " + drinkType);
      return;
    }
    const made = this.makeDrink(drinkType);
    if (made) {
      this.money += drink.price;
    }
  },

  buyBeans: function (numBeans) {
    const costPerBean = 2;
    const totalCost = numBeans * costPerBean;
    if (this.money >= totalCost) {
      this.money -= totalCost;
      this.beans += numBeans;
    } else {
      console.log("There is not enough money to buy beans.");
    }
  },

  makeDrink: function (drinkType) {
    if (!(drinkType in this.drinkRequirements)) {
      console.log("Sorry, we don't make " + drinkType);
      return false;
    }

    const requiredBeans = this.drinkRequirements[drinkType].beanRequirement;

    if (this.beans < requiredBeans) {
      console.log("Sorry, we're all out of beans!");
      return false;
    }

    this.beans -= requiredBeans;
    return true;
  },
};

coffeeShop2.buyDrink("latte");
console.log("Money:", coffeeShop2.money);
console.log("Beans:", coffeeShop2.beans);

coffeeShop2.buyDrink("filtered");
coffeeShop2.buyDrink("doubleShot");
console.log("Money:", coffeeShop2.money);
console.log("Beans:", coffeeShop2.beans);
coffeeShop2.buyDrink("frenchPress");

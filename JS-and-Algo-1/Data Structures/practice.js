//Ex1
class UniqueArray {
  constructor() {
    this.items = [];
    this.lookup = {};
  }

  add(item) {
    if (!this.lookup[item]) {
      this.items[this.items.length] = item;
      this.lookup[item] = true;
    }
  }

  showAll() {
    console.log(this.items);
  }

  exists(item) {
    if (this.lookup[item]) {
      return true;
    } else {
      return false;
    }
  }

  get(index) {
    if (this.items[index]) {
      return this.items[index];
    } else {
      return -1;
    }
  }
}

const uniqueStuff1 = new UniqueArray();
uniqueStuff1.add("toy");
uniqueStuff1.showAll(); //prints ["toy"]
uniqueStuff1.add("toy");
uniqueStuff1.showAll(); //prints ["toy"]
uniqueStuff1.exists("toy"); //returns true
uniqueStuff1.add("poster");
uniqueStuff1.add("hydrogen");
uniqueStuff1.showAll();
console.log(uniqueStuff1.get(2)); //prints

//Ex2
class UniqueArrayModified {
  constructor() {
    this.items = [];
  }

  add(item) {
    if (!this.exists(item)) {
      this.items[this.items.length] = item;
    }
  }

  showAll() {
    console.log(this.items);
  }

  exists(item) {
    const itemStr = JSON.stringify(item);
    for (let i = 0; i < this.items.length; i++) {
      if (JSON.stringify(this.items[i]) === itemStr) {
        return true;
      }
    }
    return false;
  }

  get(index) {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    } else {
      return -1;
    }
  }
}

const uniqueStuff = new UniqueArrayModified();
uniqueStuff.add("toy");
uniqueStuff.showAll();
uniqueStuff.exists("toy");
uniqueStuff.add({ x: 3 });
uniqueStuff.showAll();
uniqueStuff.exists({ x: 3 });
uniqueStuff.showAll();
uniqueStuff.add({ x: 3 });
uniqueStuff.showAll();
console.log(uniqueStuff.get(2));

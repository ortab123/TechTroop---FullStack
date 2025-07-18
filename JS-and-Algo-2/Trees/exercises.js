class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
  insertLeft(value) {
    if (!this.leftChild) {
      this.leftChild = new Node(value);
    } else {
      let newNode = new Node(value);
      newNode.leftChild = this.leftChild;
      this.leftChild = newNode;
    }
  }

  insertRight(value) {
    if (!this.rightChild) {
      this.rightChild = new Node(value);
    } else {
      let newNode = new Node(value);
      newNode.rightChild = this.rightChild;
      this.rightChild = newNode;
    }
  }
}

//BTSTree
class BSNode {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }

  insertNode(newVal) {
    if (!this.value) {
      this.value = newVal;
    } else if (newVal > this.value && this.rightChild) {
      this.rightChild.insertNode(newVal);
    } else if (newVal <= this.value && this.leftChild) {
      this.leftChild.insertNode(newVal);
    } else if (newVal <= this.value) {
      this.leftChild = new BSNode(newVal);
    } else {
      this.rightChild = new BSNode(newVal);
    }
  }

  findNode(value) {
    if (!this.value) {
      return false;
    }

    if (this.value === value) {
      return true;
    } else if (value > this.value) {
      return this.rightChild ? this.rightChild.findNode(value) : false;
    } else if (value < this.value) {
      return this.leftChild ? this.leftChild.findNode(value) : false;
    }
  }

  findCommonParent(val1, val2) {
    const val1Exist = this.findNode(val1);
    const val2Exist = this.findNode(val2);

    if (!val1Exist || !val2Exist) {
      console.log("One or both values do not exist in the tree.");
      return null;
    }

    if (
      (val1 < this.value && val2 > this.value) ||
      (val1 > this.value && val2 < this.value)
    ) {
      return this.value;
    }

    if (val1 < this.value && val2 < this.value && this.leftChild) {
      const res = this.leftChild.findCommonParent(val1, val2);
      return res === val1 || res === val2 ? this.value : res;
    }

    if (val1 > this.value && val2 > this.value && this.rightChild) {
      const res = this.rightChild.findCommonParent(val1, val2);
      return res === val1 || res === val2 ? this.value : res;
    }

    return this.value;
  }

  removeNode(node, value) {
    if (node.value === value) {
      return this._removeRoot(node);
    }

    const nodeParent = this._findNodeParent(node, value);
    const isLeft = nodeParent.leftChild && nodeParent.leftChild.value === value;
    const nodeParentSide = isLeft ? "leftChild" : "rightChild";
    const nodeToDelete = nodeParent[nodeParentSide];

    if (this._isLeaf(nodeToDelete)) {
      nodeParent[nodeParentSide] = null;
    } else if (this._hasOneChild(nodeToDelete)) {
      const nodeToUp = nodeToDelete.leftChild || nodeToDelete.rightChild;
      nodeParent[nodeParentSide] = nodeToUp;
    } else {
      this._replaceWithMaxFromLeft(nodeToDelete);
    }

    return node;
  }

  _findNodeParent(node, value) {
    if (node.leftChild.value === value || node.rightChild.value === value) {
      return node;
    } else if (node.value > value && node.leftChild) {
      return this._findNodeParent(node.leftChild, value);
    } else if (node.value < value && node.rightChild) {
      return this._findNodeParent(node.rightChild, value);
    }
  }

  _removeRoot(node) {
    if (this._isLeaf(node)) {
      return null;
    }

    if (this._hasOneChild(node)) {
      return node.leftChild || node.rightChild;
    }

    this._replaceWithMaxFromLeft(node);
    return node;
  }

  _isLeaf(node) {
    return node.leftChild === null && node.rightChild === null;
  }

  _hasOneChild(node) {
    return (
      (node.leftChild === null && node.rightChild !== null) ||
      (node.leftChild !== null && node.rightChild === null)
    );
  }

  _replaceWithMaxFromLeft(node) {
    let nodeToUp = node.leftChild;
    let nodeToUpParent = null;

    while (nodeToUp.rightChild) {
      nodeToUpParent = nodeToUp;
      nodeToUp = nodeToUp.rightChild;
    }

    node.value = nodeToUp.value;

    if (nodeToUpParent) {
      if (nodeToUpParent.rightChild === nodeToUp) {
        nodeToUpParent.rightChild = nodeToUp.leftChild;
      } else {
        nodeToUpParent.leftChild = nodeToUp.leftChild;
      }
    } else {
      node.leftChild = nodeToUp.leftChild;
    }
  }
}

// const letters = ["J", "H", "R", "E", "S", "P", "G", "B", "L", "Y", "I"];
// const bsTree = new BSNode();

// letters.forEach((l) => {
//   bsTree.insertNode(l);
// });

// console.log(bsTree.findNode("H")); // should print true
// console.log(bsTree.findNode("G")); // should print true
// console.log(bsTree.findNode("Z")); // should print false
// console.log(bsTree.findNode("F")); // should print false
// console.log(bsTree.findNode("y")); // should print false - we didn't make the tree case sensitive!

// console.log(bsTree.findCommonParent("B", "I")); //should return "H"
// console.log(bsTree.findCommonParent("B", "G")); //should return "E"
// console.log(bsTree.findCommonParent("B", "L")); //should return "J"
// console.log(bsTree.findCommonParent("L", "Y")); //should return "R"
// console.log(bsTree.findCommonParent("E", "H")); //should return "J"

const numbers = [8, 9, 12, 3, 5, 1, 11, 4];
let nodeWithOneChild = new BSNode();
numbers.forEach((n) => nodeWithOneChild.insertNode(n));
console.log(nodeWithOneChild.removeNode(nodeWithOneChild, 9));

let nodeWithTwoChildren = new BSNode();
numbers.forEach((n) => nodeWithTwoChildren.insertNode(n));
console.log(nodeWithTwoChildren.removeNode(nodeWithTwoChildren, 8));

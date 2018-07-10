// The item and categoriy id domain overlap in the tree
// so we need to pad the category id in the tree
const ROOT_ID = "HOME";
const CATEGORY_PAD = 100000;

export default class Tree {
  constructor() {
    this.root = null;
  }

  getRoot() {
    return this.root;
  }

  build(data, parentId) {
    // can improve this by not calling this.add() as it calls Node.find() each time
    if (!parentId) {
      parentId = ROOT_ID;
      this.add({ Id: parentId, Name: parentId, Type: "CATEGORY" });
    }
    data.forEach(node => {
      this.add(node, parentId);
      if (node.Children) this.build(node.Children, node.Id + CATEGORY_PAD);
    });
  }

  add(data, parentId) {
    const newNode = new Node(data, parentId);
    const parentNode = parentId ? this.root.find(parentId) : null;
    if (parentNode) {
      parentNode.children.push(newNode);
    } else {
      if (!this.root) {
        this.root = newNode;
      } else {
        throw new Error("Couldn't find the parent node");
      }
    }
  }

  // search the whole tree, display all the items that include the text
  search(text) {
    let result = [];
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node.name && this.prepare(node.name).includes(this.prepare(text)))
        result.push(node);
      node.children.forEach(n => queue.push(n));
    }
    return result;
  }

  prepare(text) {
    return text.trim().toLowerCase();
  }

  // search the path from root down, level by level until no more children
  navigate(path) {
    if (!path || !path.length) return this.root;
    let curr = path.shift();
    let queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node.id === curr) {
        if (!path.length) return node;
        curr = path.shift();
      }
      node.children.forEach(n => queue.push(n));
    }
    return null;
  }

  // all the node in this categroy to string
  toString() {
    const queue = [this.root];
    let string = "";
    while (queue.length) {
      const node = queue.shift();
      string += `${node.name} `;
      node.children.forEach(n => queue.push(n));
    }
    return string;
  }
}

class Node {
  constructor(data, parentId) {
    this.name = data.DisplayName;
    this.deliveryLeadTimeHours = data.DeliveryLeadTimeHours;
    this.hireType = data.HireType;
    this.pickupLeadTimeHours = data.PickupLeadTimeHours;
    this.type = data.Type;
    this.id = parentId && this.isCategory() ? data.Id + CATEGORY_PAD : data.Id;
    this.parentId = parentId ? parentId : null;
    this.children = [];
    // this.node = data;
    this.node = {
      id: this.id, //TOCHECK this.id or data.id
      name: data.DisplayName,
      deliveryLeadTimeHours: data.DeliveryLeadTimeHours,
      hireType: data.HireType,
      pickupLeadTimeHours: data.PickupLeadTimeHours,
      type: data.Type
    };
    // console.log("node: ", this)
  }

  // find id from current node and its children
  find(id) {
    const queue = [this];
    while (queue.length) {
      const node = queue.shift();
      if (node.id === id) return node;
      if (node.isCategory() && node.id + CATEGORY_PAD === id) return node;
      node.children.forEach(n => queue.push(n));
    }
    return null;
  }

  isCategory() {
    return this.type && this.type.toLowerCase() === "category";
  }
}

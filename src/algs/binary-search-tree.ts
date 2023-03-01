class BSTNode {
  public data: number;

  public left: BSTNode | null;

  public right: BSTNode | null;

  constructor(data: number, left: BSTNode | null = null, right: BSTNode | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  private root: BSTNode | null;

  constructor() {
    this.root = null;
  }

  public inorder(rootNode: BSTNode | null = this.root): null | void {
    if (rootNode === null) {
      return null;
    }

    this.inorder(rootNode.left);
    console.log(rootNode.data);
    this.inorder(rootNode.right);
  }

  public preorder(rootNode: BSTNode | null = this.root): null | void {
    if (rootNode === null) {
      return null;
    }

    console.log(rootNode.data);
    this.inorder(rootNode.left);
    this.inorder(rootNode.right);
  }

  public postorder(rootNode: BSTNode | null = this.root): null | void {
    if (rootNode === null) {
      return null;
    }

    this.inorder(rootNode.left);
    this.inorder(rootNode.right);
    console.log(rootNode.data);
  }

  public insert(data: number) {
    if (this.root === null) {
      this.root = new BSTNode(data);
      return;
    }

    this.root = this.insertNode(this.root, data);
  }

  public remove(data: number) {
    this.root = this.removeNode(this.root, data);
  }

  private removeNode(rootNode: BSTNode | null, data: number): BSTNode | null {
    if (rootNode === null) {
      return null;
    }

    const rootNodeClone = new BSTNode(rootNode.data, rootNode.left, rootNode.right);

    if (rootNodeClone.data < data) {
      rootNodeClone.right = this.removeNode(rootNodeClone.right, data);
      return rootNodeClone;
    }

    if (rootNodeClone.data > data) {
      rootNodeClone.left = this.removeNode(rootNodeClone.left, data);
      return rootNodeClone;
    }

    if (rootNodeClone.left === null && rootNodeClone.right === null) {
      return null;
    }

    if (rootNodeClone.left === null) {
      return rootNodeClone.right;
    }

    if (rootNodeClone.right === null) {
      return rootNodeClone.left;
    }

    const rightMinNode = this.findMinNode(rootNodeClone.right) as BSTNode;

    rootNodeClone.data = rightMinNode.data;
    rootNodeClone.right = this.removeNode(rootNodeClone.right, rightMinNode.data);

    return rootNodeClone;
  }

  private insertNode(rootNode: BSTNode | null, data: number) {
    if (rootNode === null) {
      const newNode = new BSTNode(data);
      return newNode;
    }

    const rootNodeClone = new BSTNode(rootNode.data, rootNode.left, rootNode.right);

    if (rootNode.data < data) {
      rootNodeClone.right = this.insertNode(rootNode.right, data);
      return rootNodeClone;
    }

    if (rootNode.data > data) {
      rootNodeClone.left = this.insertNode(rootNode.left, data);
      return rootNodeClone;
    }

    return rootNodeClone;
  }

  public getRootNode() {
    return this.root;
  }

  public findMinNode(rootNode: BSTNode | null): BSTNode | null {
    if (rootNode === null) {
      return null;
    }

    if (rootNode.left === null) {
      return rootNode;
    }

    return this.findMinNode(rootNode.left);
  }

  public has(data: number): boolean {
    return this.find(data) !== null;
  }

  public find(data: number): BSTNode | null {
    return this.findNode(this.root, data);
  }

  private findNode(rootNode: BSTNode | null, data: number): BSTNode | null {
    if (rootNode === null) {
      return null;
    }

    if (rootNode.data < data) {
      return this.findNode(rootNode.right, data);
    }

    if (rootNode.data > data) {
      return this.findNode(rootNode.left, data);
    }

    return rootNode;
  }
}

export { BSTNode, BST };

export function howTo() {
  const bst = new BST();
  bst.insert(100);
  bst.insert(50);
  bst.insert(40);
  bst.insert(60);
  bst.insert(55);
  bst.insert(65);
  bst.insert(150);
  bst.insert(125);
  bst.insert(175);

  bst.inorder();
  console.log('--');
  bst.preorder();
  console.log('--');
  bst.postorder();

  console.dir(bst, { depth: 10 });
  bst.remove(50);
  console.dir(bst, { depth: 10 });
  bst.insert(50);
  console.dir(bst, { depth: 10 });
}

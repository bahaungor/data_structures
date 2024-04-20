function BST(){
  let root = null;
  function _Node(data, left=null, right=null){
    // This function returns new node with data & "null" as left & right values
    // data: value of the node
    // left: another node. null by default. To be assigned later on.
    // right: another node. null by default. To be assigned later on.
    // returns new node object with "data", "left" and "right" attributes
    return { data, left, right }
  }
  
  function tree(arr){
    // This function sorts & builds new BST from array
    // arr: array to create BST
    // returns the whole tree → {data: 20, left: [Object], right: [Object]}
    let sorted = [...new Set(arr)].sort() // remove duplicates & sort array
    root = _buildTree(sorted, 0, sorted.length-1)
    return root
  }

  function _buildTree(arr, start, end){
    // This function builds tree from array by recursivelly calling itself until middle index of the array is not larger than start index
    // start: index of the smallest number in the array
    // end: index of the largest number in the array
    // returns connected nodes which is a tree
    if(start>end) return null;

    let mid = Math.floor((start+end)/2); //Find the middle index of the array

    const node = _Node(arr[mid]); // Build node from the middle element of the array → {data: arr[mid], left:null, right: null}

    node.left = _buildTree(arr, start, mid - 1); // Recursively call this function to build left side of the tree first
    node.right = _buildTree(arr, mid + 1, end); // Recursively call this function to build right side of the tree

    return node
  }

  function insert(data){
    // This function inserts given data to the tree
    // returns the new tree
    root = _insertRec(root, data);
  }

  function _insertRec(root, data){
    if (!root) return _Node(data) // If the tree is empty, return a new node
    
    if (data < root.data) {
      root.left = _insertRec(root.left, data)
    } else {
      root.right = _insertRec(root.right, data)
    }

    return root
  }

  function deleteNode(data) {
    root = _deleteNodeRec(root, data);
  }

  function _deleteNodeRec(root, data) {
    if (!root) return root;

    if (root.data > data) {
      root.left = _deleteNodeRec(root.left, data);
      return root;
    } else if (root.data < data) {
      root.right = _deleteNodeRec(root.right, data);
      return root;
    }

    // If one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      root = null;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      root = null;
      return temp;
    }

    // If both children exist
    else {
      let succParent = root;

      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      // Copy Successor Data to root
      root.data = succ.data;

      // Delete Successor and return root
      succ = null;
      return root;
    }
  }

  function find(data){
    let result = _searchData(root, data);
    return result
  }

  function _searchData(root, data){
    if (root === null || root.data === data) return root; // Base Cases: root is null or key is present at root
    
    // Data is greater than root's data
    if (root.data < data){
      return _searchData(root.right, data);
    }

    // Data is smaller than root's data
    return _searchData(root.left, data);
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function levelOrder(callback) {
    if (!root) return []; // If the tree is empty, return an empty array

    const queue = [root]; // Initialize queue with the root node
    const values = []; // Initialize an array to store the values of traversed nodes

    while (queue.length > 0) {
      const node = queue.shift(); // Dequeue the front node from the queue

      if (callback) {
        callback(node.data); // If callback function is provided, apply it to the node data
      } else {
        values.push(node.data); // Otherwise, push the node data to the values array
      }

      if (node.left) {
        queue.push(node.left); // Enqueue left child if it exists
      }
      if (node.right) {
        queue.push(node.right); // Enqueue right child if it exists
      }
    }

    return values; // Return array of values if no callback is provided
  }

  function inOrder(callback) {
    const values = []; // Initialize an array to store the values of traversed nodes

    function traverse(node) {
      if (!node) return;

      traverse(node.left); // Recursively traverse left subtree
      if (callback) {
        callback(node.data); // If callback function is provided, apply it to the node data
      } else {
        values.push(node.data); // Otherwise, push the node data to the values array
      }
      traverse(node.right); // Recursively traverse right subtree
    }

    traverse(root); // Start traversal from the root

    return values; // Return array of values if no callback is provided
  }

  function preOrder(callback) {
    const values = []; // Initialize an array to store the values of traversed nodes

    function traverse(node) {
      if (!node) return;

      if (callback) {
        callback(node.data); // If callback function is provided, apply it to the node data
      } else {
        values.push(node.data); // Otherwise, push the node data to the values array
      }
      traverse(node.left); // Recursively traverse left subtree
      traverse(node.right); // Recursively traverse right subtree
    }

    traverse(root); // Start traversal from the root

    return values; // Return array of values if no callback is provided
  }

  function postOrder(callback) {
    const values = []; // Initialize an array to store the values of traversed nodes

    function traverse(node) {
      if (!node) return;

      traverse(node.left); // Recursively traverse left subtree
      traverse(node.right); // Recursively traverse right subtree
      if (callback) {
        callback(node.data); // If callback function is provided, apply it to the node data
      } else {
        values.push(node.data); // Otherwise, push the node data to the values array
      }
    }

    traverse(root); // Start traversal from the root

    return values; // Return array of values if no callback is provided
  }

  function height(node) {
    if (!node) return -1; // Height of null node is -1

    const leftHeight = height(node.left); // Height of left subtree
    const rightHeight = height(node.right); // Height of right subtree

    // Height of the node is the maximum height of its subtrees plus 1 (to account for the current node)
    return Math.max(leftHeight, rightHeight) + 1;
  }

  function isBalanced() {
    return checkBalanced(root);
  }

  function checkBalanced(node) {
    if (!node) return true; // Base case: An empty tree is balanced

    // Calculate the height of the left and right subtrees
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Check if the absolute difference in heights is not more than 1
    // and recursively check if both left and right subtrees are balanced
    return Math.abs(leftHeight - rightHeight) <= 1 &&
           checkBalanced(node.left) &&
           checkBalanced(node.right);
  }

  function rebalance() {
    const nodes = [];
    // Traverse the tree in any depth-first order and collect all nodes into an array
    inOrderTraversal(root, nodes);

    // Rebuild the tree from the collected nodes array
    root = buildTree(nodes, 0, nodes.length - 1);
  }

  function inOrderTraversal(node, nodes) {
    if (!node) return;
    inOrderTraversal(node.left, nodes);
    nodes.push(node);
    inOrderTraversal(node.right, nodes);
  }

  function buildTree(nodes, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = nodes[mid];

    node.left = buildTree(nodes, start, mid - 1);
    node.right = buildTree(nodes, mid + 1, end);

    return node;
  }

  return { tree, insert, deleteNode, find, prettyPrint, levelOrder, inOrder, preOrder, postOrder, height, isBalanced, rebalance }
}

let deneme = BST()
let myTree = deneme.tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
deneme.insert(11)
deneme.deleteNode(11)
console.log(deneme.find(9))
console.log(deneme.prettyPrint(myTree))

console.log("Breadth-first traversal:");
deneme.levelOrder((data) => console.log(data));

console.log("In-order traversal:");
deneme.inOrder((data) => console.log(data)); // Callback function to log each node
// Or to get an array of values:
// const inOrderValues = deneme.inOrder();

console.log("Pre-order traversal:");
deneme.preOrder((data) => console.log(data)); // Callback function to log each node
// Or to get an array of values:
// const preOrderValues = deneme.preOrder();

console.log("Post-order traversal:");
deneme.postOrder((data) => console.log(data)); // Callback function to log each node
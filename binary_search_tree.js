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

  return { tree, insert, prettyPrint}
}

let deneme = BST()
let myTree = deneme.tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
deneme.insert(11)
console.log(deneme.prettyPrint(myTree))

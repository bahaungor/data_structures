function BST(){
  function _Node(data, left=null, right=null){
    return { data, left, right }
  }
  
  function tree(arr){
    let sorted = [...new Set(arr)].sort()
    let root = _buildTree(sorted, 0, sorted.length-1)
    return root
  }

  function _buildTree(arr, start, end){
    if(start>end) return null;

    let mid = Math.floor((start+end)/2);

    const node = _Node(arr[mid]);

    node.left = _buildTree(arr, start, mid - 1);
    node.right = _buildTree(arr, mid + 1, end);

    return node
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

  return { tree, prettyPrint}
}

let deneme = BST()
let rot = deneme.tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
console.log(deneme.prettyPrint(rot))
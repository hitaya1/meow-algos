class BinaryTree {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function nodeDepths(root) {
  // Write your code here.
	let overallNodeDepth = 0;
	function calculateDepth(node, currDepth) {
		overallNodeDepth += currDepth;
		if (node.left) {calculateDepth(node.left, currDepth + 1)}
		if (node.right) {calculateDepth(node.right, currDepth + 1)}
	}
	calculateDepth(root, overallNodeDepth)
	return overallNodeDepth
}
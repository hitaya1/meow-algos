**Binary search trees** (BST), sometimes called
ordered or sorted binary trees, are a particular type of container:
data structures that store "items" (such as numbers, names etc.)
in memory.

Usage & advantages: fast lookup, addition and removal of
items, and can be used to implement either dynamic sets of
items, or lookup tables that allow finding an item by its key
(e.g., finding the phone number of a person by name).

Binary search trees keep their keys in sorted order, so that lookup
and other operations can use the principle of binary search:
when looking for a key in a tree (or a place to insert a new key),
they traverse the tree from root to leaf, making comparisons to
keys stored in the nodes of the tree and deciding, on the basis
of the comparison, to continue searching in the left or right
subtrees. On average, this means that each comparison allows
the operations to skip about half of the tree, so that each
lookup, insertion or deletion takes time proportional to the
logarithm of the number of items stored in the tree. This is
much better than the linear time required to find items by key
in an (unsorted) array, but slower than the corresponding
operations on hash tables.

A binary search tree of size 9 and depth 3, with 8 at the root.
The leaves are not drawn.

![Binary Search Tree](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

## Pseudocode for Basic Operations

### Insertion

```text
insert(value)
  value has passed custom type checks for type T ->
  value has been placed in the correct location in the tree
  if root === ø
    root = node(value)
  else
    insertNode(root, value)
```

```text
insertNode(current, value)
 current is the node to start from ->
 value has been placed in the correct location in the tree
  if value < current.value
    if current.left === ø
      current.left = node(value)
    else
      InsertNode(current.left, value)
  else
    if current.right === ø
      current.right = node(value)
    else
      InsertNode(current.right, value)
```

### Searching

```text
contains(root, value)
  root is the root node of the tree, value is what we would like to locate -> value is either located or not
  if root === ø
    return false
  if root.value === value
    return true
  else if value < root.value
    return contains(root.left, value)
  else
    return contains(root.right, value)
```


### Deletion

```text
remove(value)
value is the value of the node to remove, root is the node of the BST
count is the number of items in the BST -> node with value is removed if found in which case yields true, otherwise false
  nodeToRemove = findNode(value)
  if nodeToRemove === ø
    return false
  parent = findParent(value)
  if count === 1
    root = ø
  else if nodeToRemove.left === ø and nodeToRemove.right === ø
    if nodeToRemove.value < parent.value
      parent.left =  nodeToRemove.right
    else
      parent.right = nodeToRemove.right
  else if nodeToRemove.left !== ø and nodeToRemove.right !== ø
    next = nodeToRemove.right
    while next.left !== ø
      next = next.left
    if next !== nodeToRemove.right
      remove(next.value)
      nodeToRemove.value = next.value
    else
      nodeToRemove.value = next.value
      nodeToRemove.right = nodeToRemove.right.right
  else
    if nodeToRemove.left = ø
      next = nodeToRemove.right
    else
      next = nodeToRemove.left
    if root = nodeToRemove
      root = next
    else if parent.left = nodeToRemove
      parent.left = next
    else if parent.right = nodeToRemove
      parent.right = next
  count = count - 1
  return true
```

### Find Parent of Node

```text
findParent(value, root)
value is the value of the node we want to find the parent of root is the root node of the BST and is !== ø ->
a reference to the prent node of value if found; otherwise ø
  if value === root.value
    return ø
  if value < root.value
    if root.left === ø
      return ø
    else if root.left.value === value
      return root
    else
      return findParent(value, root.left)
  else
    if root.right === ø
      return ø
    else if root.right.value === value
      return root
    else
      return findParent(value, root.right)
```

### Find Node

```text
findNode(root, value)
  value is the value of the node we want to find the parent of root
  is the root node of the BST -> a reference to the node of value if found; otherwise ø
  if root = ø
    return ø
  if root.value = value
    return root
  else if value < root.value
    return findNode(root.left, value)
  else
    return findNode(root.right, value)
```

### Find Minimum

```text
findMin(root)
  root is the root node of the BST
    root = ø
  -> the smallest value in the BST is located
  if root.left = ø
    return root.value
  findMin(root.left)
```

### Find Maximum

```text
findMax(root)
  root is the root node of the BST
    root = ø
  -> the largest value in the BST is located
  if root.right = ø
    return root.value
  findMax(root.right)
```

### Traversal

#### InOrder Traversal

```text
inorder(root)
  root is the root node of the BST -> the nodes in the BST have been visited in inorder
  if root !== ø
    inorder(root.left)
    yield root.value
    inorder(root.right)
```

#### PreOrder Traversal

```text
preorder(root)
  root is the root node of the BST ->  the nodes in the BST have been visited in preorder
  if root != ø
    yield root.value
    preorder(root.left)
    preorder(root.right)
```

#### PostOrder Traversal

```text
postorder(root)
  root is the root node of the BST -> the nodes in the BST have been visited in postorder
  if root != ø
    postorder(root.left)
    postorder(root.right)
    yield root.value
```

## Complexities

### Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(log(n)) | O(log(n)) | O(log(n)) | O(log(n)) |

### Space Complexity

O(n)


A **doubly linked list** is a linked data structure that
consists of a set of sequentially linked records (nodes).
Each node contains two fields, called links, that are references to the previous and to the next
node in the sequence of nodes.
The beginning and ending nodes' previous and next links, respectively, point to null.

![Doubly Linked List](https://upload.wikimedia.org/wikipedia/commons/5/5e/Doubly-linked-list.svg)

Advantages: traversal of the list in either direction.
While adding or removing a node in a doubly linked list requires changing more links than the
same operations on a singly linked list, the operations are simpler and
potentially more efficient (for nodes other than first nodes) because there
is no need to keep track of the previous node during traversal or no need
to traverse the list to find the previous node, so that its link can be modified.

## Pseudocode for Basic Operations

### Insert

```text
add(value)
value is the value to add to the list ->  value has been placed at the tail of the list
  n = node(value)
  if head === ø
    head = n
    tail = n
  else
    n.previous = tail
    tail.next = n
    tail = n
```

### Delete

```text
remove(head, value)
  head is the head node in the list, value is the value to remove from the list ->
  value is removed from the list, true; otherwise false
  if head === ø
    return false
  if value === head.value
    if head === tail
      head = ø
      tail = ø
    else
      head = head.next
      head.previous = ø
    return true
  n = head.next
  while n !== ø and value !== n.value
    n = n.next
  if n === tail
    tail = tail.previous
    tail.next = ø
    return true
  else if n !== ø
    n.previous.next = n.next
    n.next.previous = n.previous
    return true
  return false
```

### Reverse Traversal

```text
reverseTraversal(tail)
 tail is the node of the list to traverse -> the list has been traversed in reverse order
  n = tail
  while n !== ø
    yield n.value
    n = n.previous
```

## Complexities

## Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(1)      | O(n)      |

### Space Complexity

O(n)


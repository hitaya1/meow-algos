A linked list is a data structure consisting of a group of nodes which together represent a sequence. Each node = data + a reference (a link) to the next node in the sequence.

Advantages: efficient insertion/removal of elements from any position in the sequence during iteration.

Disadvantages:  access time is linear (and difficult to pipeline). Arrays have better cache locality as compared to linked lists.

## Pseudocode for Basic Operations

### Insert

```text
add(value)
--- value is the value to add to the list -->
value has been placed at the tail of the list ---
  n = node(value)
  if head === ø
    head = n
    tail = n
  else
    tail.next = n
    tail = n
```

```text
prepend(value) --- value is the value to add to the list -->
 value has been placed at the head of the list ---
 n = node(value)
 n.next = head
 head = n
 if tail === ø
   tail = n
```

### Search

```text
contains(head, value)
--- head is the head node in the list value is the value to search for ->
the item is either in the ll, true; otherwise false ---
  n = head
  while n !== ø && n.value !== value
    n = n.next
  if n === ø
    return false
  return true
```

### Delete

```text
remove(head, value)
--- head is the head node in the list value is the value to remove from the list ->
 value is removed from the list, true, otherwise false ---
  if head === ø
    return false
  n = head
  if n.value === value
    if head === tail
      head = ø
      tail = ø
    else
      head = head.next
    return true

  while n.next !== ø && n.next.value !== value
    n = n.next
  if n.next !== ø
    if n.next === tail
      tail = n
      tail.next === null
    n.next = n.next.next
    return true
  return false
```

### Traverse

```text
traverse(head)
--- head is the head node in the list -> the items in the list have been traversed ---
  n = head
  while n !== ø
    yield n.value
    n = n.next
```

### Traverse in Reverse

```text
reverseTraversal(head, tail)
--- head and tail belong to the same list ->
 the items in the list have been traversed in reverse order ---
  if tail !== ø
    curr = tail
    while curr !== head
      prev = head
      while prev.next !== curr
        prev = prev.next
      yield curr.value
      curr = prev
   yield curr.value
```

## Complexities

### Time Complexity

| Access    | Search    | Insertion | Deletion  |
| :-------: | :-------: | :-------: | :-------: |
| O(n)      | O(n)      | O(1)      | O(n)      |

### Space Complexity

O(n)


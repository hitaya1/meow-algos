import MinHeap from '../heap/heap'
import Comparator from '../comparator'

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
class PriorityQueue extends MinHeap {
	constructor() {
		// Call MinHip constructor first.
		super()

		// Setup priorities map.
		this.priorities = new Map()

		// Use custom comparator for heap elements that will take element priority
		// instead of element value into account.
		this.compare = new Comparator(this.comparePriority.bind(this))
	}

	// Add item to the priority queue.
	add(item, priority = 0) {
		this.priorities.set(item, priority)
		super.add(item)
		return this
	}

	//  Remove item from priority queue.
	remove(item, customFindingComparator) {
		super.remove(item, customFindingComparator)
		this.priorities.delete(item)
		return this
	}

	// Change priority of the item in a queue.

	changePriority(item, priority) {
		this.remove(item, new Comparator(this.compareValue))
		this.add(item, priority)
		return this
	}

	// Find item by ite value.
	findByValue(item) {
		return this.find(item, new Comparator(this.compareValue))
	}

	// Check if item already exists in a queue.
	hasValue(item) {
		return this.findByValue(item).length > 0
	}

	// Compares priorities of two items.
	comparePriority(a, b) {
		if (this.priorities.get(a) === this.priorities.get(b)) {
			return 0
		}
		return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
	}

	//  Compares values of two items.
	compareValue(a, b) {
		if (a === b) {
			return 0
		}
		return a < b ? -1 : 1
	}
}

//1. Contains duplicate
//TC: O(N), SC: O(N)
var containsDuplicate = function (nums) {
	const set = new Set()
	for (let num of nums) {
		if (set.has(num)) {
			return true
		} else {
			set.add(num)
		}
	}
	return false
}

//2. Two Sum
//TC: O(N), SC: O(1)
var moveZeroes = function (nums) {
	let first = 0
	let second = 0
	while (second < nums.length) {
		if (nums[first] === 0) {
			if (nums[second] !== 0) {
				nums[first] = nums[second]
				nums[second] = 0
				first++
			}
			second++
		} else {
			first++
			second++
		}
	}
	return nums
}

//3.https://leetcode.com/problems/middle-of-the-linked-list/

//4. Valid Parenthses
//TC: O(N), SC: O(1)
// /Time complexity : O(n)O(n) because we simply traverse the given string one character at a time and push and pop operations on a stack take O(1)O(1) time.
// Space complexity : O(n)O(n) as we push all opening brackets onto the stack and in the worst case, we will end up pushing all the brackets onto the stack. e.g. ((((((((((.
var isValid = function (s) {
	const stack = []
	const openingbracks = ['(', '[', '{']
	const closingbracks = [')', ']', '}']
	for (let bracket of s) {
		if (openingbracks.includes(bracket)) {
			stack.push(bracket)
		} else {
			if (stack.pop() !== openingbracks[closingbracks.indexOf(bracket)])
				return false
		}
	}
	return stack.length === 0
}

var isValid = function (s) {
	var stack = []

	for (let i = 0; i < s.length; i++) {
		let ch = s.charAt(i)

		if (ch === '(' || ch === '[' || ch === '{') {
			stack.push(getEquivalentClosingBracket(ch))
		} else if (stack.length === 0 || stack.pop() !== ch) {
			return false
		}
	}
	return stack.length === 0
}

function getEquivalentClosingBracket(ch) {
	if (ch === '(') {
		return ')'
	}
	if (ch === '[') {
		return ']'
	}
	return '}'
}

//5. First Unique character in a string
// Time complexity : O(N) since we go through the string of length N two times.
// Space complexity : O(1) because English alphabet contains 26 letters.
var firstUniqChar = function (s) {
	const counter = {}
	for (let i = 0; i < s.length; i++) {
		const letter = s[i]
		if (letter in counter) {
			counter[letter].fr++
		} else {
			counter[letter] = { fr: 1, idx: i }
		}
	}
	let idx = Infinity
	for (let letter in counter) {
		if (counter[letter].idx < idx && counter[letter].fr === 1) {
			idx = counter[letter].idx
		}
	}
	if (idx === Infinity) return -1
	return idx
}

var firstUniqChar = function (s) {
	const repeatedSet = new Set()
	const uniqueMap = new Map()
	for (let i = 0; i < s.length; i++) {
		const letter = s[i]
		if (uniqueMap.has(letter)) {
			uniqueMap.delete(letter)
			repeatedSet.add(letter)
		} else if (!repeatedSet.has(letter)) {
			uniqueMap.set(letter, i)
		}
	}
	const res = uniqueMap.entries().next().value
	return res ? res[1] : -1
}

//6. Ransom Note
// Time Complexity : O(m)O(m).
// When m < nm<n, we immediately return false. Therefore, the worst case occurs when m ≥ nm≥n.
// Creating a HashMap of counts for the magazine is O(m)O(m), as each insertion/ count update is is O(1)O(1), and is done for each of the mm characters.
// We then iterate over the ransom note, performing an O(1)O(1) operation for each character in it. This has a cost of O(n)O(n).
// Becuase we know that m ≥ nm≥n, again this simplifies to O(m)O(m).
// Space Complexity : O(k)O(k) / O(1)O(1).
// Same as above.
// For this problem, because kk is never more than 2626, which is a constant, it'd be reasonable to say that this algorithm requires O(1)O(1) space.
var canConstruct = function (ransomNote, magazine) {
	const counter = {}
	for (let letter of magazine) {
		if (counter[letter]) {
			counter[letter]++
		} else {
			counter[letter] = 1
		}
	}
	for (let letter of ransomNote) {
		if (counter[letter]) {
			counter[letter]--
		} else {
			return false
		}
	}
	return true
}

// time O(n) space O(n)
var canConstruct = function (ransomNote, magazine) {
	const map = new Map()

	for (const letter of magazine) {
		map.set(letter, map.get(letter) + 1 || 1)
	}

	for (const letter of ransomNote) {
		if (!map.get(letter)) {
			return false
		}
		map.set(letter, map.get(letter) - 1)
	}

	return true
}

//7. Valid Anagram
//Time complexity : O(n). Time complexity is O(n) because accessing the counter table is a constant time operation.

// Space complexity : O(1). Although we do use extra space, the space complexity is O(1) because the map's max size is 26 (English lowercase letters)
var isAnagram = function (s, t) {
	if (s.length != t.length) {
		return false
	}
	const map = new Map()
	for (let i = 0; i < s.length; i++) {
		const letter = s[i]
		map.set(letter, map.get(letter) + 1 || 1)
	}
	for (let j = 0; j < t.length; j++) {
		const letter = t[j]
		if (!map.get(letter)) {
			return false
		}
		map.set(letter, map.get(letter) - 1)
	}
	return true
}

// 8. Best time to buy and sell stock
// time O(n) space O(1)
var maxProfit = function (prices) {
	let maxProfit = -Infinity
	let currMin = Infinity
	for (let price of prices) {
		if (price < currMin) {
			currMin = price
		}
		if (maxProfit < price - currMin) {
			maxProfit = price - currMin
		}
	}
	return maxProfit
}

// 9. Linked List Cycle
var hasCycle = function (head) {
	if (head === null) {
		return false
	}
	let slow = head
	let fast = head.next
	while (slow != fast) {
		if (fast === null || fast.next == null) {
			return false
		}
		slow = slow.next
		fast = fast.next.next
	}
	return true
}

//10. Binary Tree Preorder Traversal
// Time complexity : we visit each node exactly once, thus the time complexity is O(N), where NN is the number of nodes, i.e. the size of tree.
// Space complexity : depending on the tree structure, we could keep up to the entire tree, therefore, the space complexity is O(N).
var preorderTraversal = function (root) {
	if (!root) return []
	const result = []
	const stack = []
	stack.push(root)
	while (stack.length > 0) {
		const curr = stack.pop()
		result.push(curr.val)
		if (curr.right) {
			stack.push(curr.right)
		}
		if (curr.left) {
			stack.push(curr.left)
		}
	}
	return result
}


// let a = 3
// console.log(a^=1)

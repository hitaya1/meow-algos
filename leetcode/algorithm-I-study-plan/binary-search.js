//https://leetcode.com/study-plan/algorithm/

//1. Binary Search
//TC: O(logN); SC: O(1)
var search = function (nums, target) {
	let left = 0
	let right = nums.length - 1
	while (left < right) {
		let mid = Math.floor((left + right) / 2)
		if (target === nums[mid]) {
			return mid
		} else if (target < nums[mid]) {
			right = mid
		} else {
			left = mid + 1
		}
	}
	return -1
}

//TC: O(logN); SC: O(logN) - uses internal stack space
//If the array length is very large, Recursive program can crash due to Stack Overflow Error.
var search = function (nums, target) {
	// We can use recursion if we supply lower and higher bounds in function.
	let startIndex = 0
	let endIndex = nums.length - 1
	return recursiveSearch(nums, target, startIndex, endIndex)
}

function recursiveSearch(nums, target, startIndex, endIndex) {
	let midIndex = Math.floor((startIndex + endIndex) / 2)
	let midValue = nums[midIndex]

	// Use startIndex === endIndex and not target === midValue because
	// in case value does not exist.
	if (startIndex === endIndex) {
		// Check if it's a one-element array: [5]
		if (midValue === target) {
			return midIndex
		} else {
			return -1
		}
	} else if (target > midValue) {
		// midIndex + 1 because we used Math.floor. Which rounds down. Hence,
		// the last MidIndex (assuming target is the last value in a n = 10 array)
		// will always be 8. Which is not correct. It should be 9 for startIndex === endIndex
		// to ever evaluate to true.
		return recursiveSearch(nums, target, midIndex + 1, endIndex)
	} else if (target < midValue) {
		return recursiveSearch(nums, target, startIndex, midIndex)
	} else {
		return midIndex
	}
}

//2. Find Bad Version
//TC: O(logN); SC: O(1)
//isBadVersion(version) => returns either true or false
var solution = function (isBadVersion) {
	return function (n) {
		let left = 0
		let right = n
		while (left < right) {
			let mid = Math.floor((right + left) / 2)
			if (isBadVersion(mid) === false) {
				left = mid + 1
			} else {
				right = mid
			}
		}
		return left
	}
}

//3. Search Insert Position
var searchInsert = function(nums, target) {
	let start = 0;
	let finish = nums.length;
	while (start < finish) {
			let mid = Math.floor((start + finish)/2);
			if (target === nums[mid]) {
					return mid
			} else if (target < nums[mid]) {
					finish = mid;
			} else {
					start = mid + 1;
			}
	}
	return start
};

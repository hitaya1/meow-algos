//1. Squares of a Sorted Array
//TC: O(n); SC: O(n)
var sortedSquares = function (nums) {
	let sortedSqArr = new Array(nums.length).fill(0)
	let left = 0
	let right = nums.length - 1
	let counter = nums.length - 1
	while (left <= right) {
		let leftNum = Math.abs(nums[left])
		let rightNum = Math.abs(nums[right])
		if (leftNum > rightNum) {
			sortedSqArr[counter] = leftNum * leftNum
			left++
		} else {
			sortedSqArr[counter] = rightNum * rightNum
			right--
		}
		counter--
	}
	return sortedSqArr
}

//2. Reversed string in-place
//TC: O(N) to swap N/2 elements; SC: O(1)
var reverseString = function(s) {
  let first = 0;
  let second = s.length - 1;
  while (first <= second) {
      const saved = s[first]
      s[first] = s[second];
      s[second] = saved;
      first++;
      second--;
  }
};

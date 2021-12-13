function threeNumSum(array, targetSum) {
	//integers are distinct
	//TC: O(N^2), SC: O(N)
	array.sort((a, b) => a - b)
	const triplets = []
	//need to use i, so we don't start our leftIdx from the beginning
	for (let i = 0; i < array.length; i++) {
		const num = array[i]
		let leftIdx = i + 1
		let rightIdx = array.length - 1
		while (leftIdx < rightIdx) {
			const possibleSum = num + array[leftIdx] + array[rightIdx]
			if (possibleSum === targetSum) {
				triplets.push([num, array[leftIdx], array[rightIdx]])
				leftIdx++
				rightIdx--
			} else if (possibleSum < targetSum) {
				leftIdx++
			} else {
				rightIdx--
			}
		}
	}
	return triplets
}

// 1. Two Number Sum
function twoNumberSum(array, targetSum) {
	// qs: array has at least 2 integers?
	//nested loop - TC: O(N^2) not efficient
	//sort the array and use pointers to see if they add up to the target sum (TC: O(NlogN), SC: O(1))
	// array.sort((a,b) => a - b)
	// let start = 0;
	// let finish = array.length - 1;
	// while (start < finish) {
	// 	const possibleSum = array[start] + array[finish]
	// 	if (possibleSum === targetSum) {
	// 		return [array[start], array[finish]]
	// 	} else if (possibleSum < targetSum) {
	// 		start++
	// 	} else {
	// 		finish--
	// 	}
	// }
	// return []
	//use the hash map and store previous numbers there (TC: O(N), SC: O(N))
	const map = {}
	for (let num of array) {
		const possibleNum = targetSum - num
		if (map[possibleNum]) {
			return [possibleNum, num]
		}
		map[num] = true
	}
	return []
}

// 2. Validate Sequence
function isValidSubsequence(array, sequence) {
	//a nested loop - TC: O(N^2)
	//two pointers (one in the beginning of array and another one in sequence - TC: O(N). SC: O(1))
	let sequenceIdx = 0
	for (const arrayNum of array) {
		if (arrayNum === sequence[sequenceIdx]) {
			sequenceIdx++
		}
	}
	return sequenceIdx === sequence.length
}

// 3. Sorted Squared Array
function sortedSquaredArray(array) {
	//are all numbers are non-negative?
	//either push all of the numbers and then sort the array TC: O(NlogN), SC: O(N)
	//use pointers to keep track of the biggest num (TC: O(N), SC: O(N))
	const arr = new Array(array.length).fill(0)
	let smallerNumIdx = 0
	let biggerNumIdx = array.length - 1
	let newArrIdx = arr.length - 1
	while (smallerNumIdx <= biggerNumIdx) {
		if (Math.abs(array[smallerNumIdx]) < Math.abs(array[biggerNumIdx])) {
			arr[newArrIdx] = array[biggerNumIdx] * array[biggerNumIdx]
			biggerNumIdx--
		} else {
			arr[newArrIdx] = array[smallerNumIdx] * array[smallerNumIdx]
			smallerNumIdx++
		}
		newArrIdx--
	}
	return arr
}
// or use for loop starting from the end of the new arr

// 4. Tournament winner
function tournamentWinner(competitions, results) {
	// TC: O(N), SC: O(K)
	// N is the number of competitions, K is the number of teams
	const map = {}
	for (let i = 0; i < competitions.length; i++) {
		const competition = competitions[i]
		const result = results[i]
		const [homeTeam, awayTeam] = competition
		if (result === 0) {
			map[awayTeam] ? (map[awayTeam] += 3) : (map[awayTeam] = 3)
		} else {
			map[homeTeam] ? (map[homeTeam] += 3) : (map[homeTeam] = 3)
		}
	}
	let max = -Infinity
	let winningTeam = ''
	for (let team in map) {
		if (map[team] > max) {
			max = map[team]
			winningTeam = team
		}
	}
	return winningTeam
}

//tournament winner - a cuter way
function tournamentWinner(competitions, results) {
	// TC: O(N), SC: O(K)
	// N is the number of competitions, K is the number of teams
	const map = {}
	const homeTeamWon = 1
	let maxPoints = -Infinity
	let winningTeam = ''
	let theBest = ''
	for (let i = 0; i < competitions.length; i++) {
		const competition = competitions[i]
		const result = results[i]
		const [homeTeam, awayTeam] = competition
		winningTeam = result === homeTeamWon ? homeTeam : awayTeam
		addPoints(winningTeam, 3)
		if (map[winningTeam] > maxPoints) {
			maxPoints = map[winningTeam]
			theBest = winningTeam
		}
	}
	return theBest
}

function addPoints(winningTeam, points) {
	if (map[winningTeam]) {
		map[winningTeam] += 3
	} else {
		map[winningTeam] = 3
	}
}

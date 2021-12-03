const comparatorFunction = (a, b) => {
	if (a.customValue === b.customValue) {
		return 0
	}

	return a.customValue < b.customValue ? -1 : 1
}

export default comparatorFunction

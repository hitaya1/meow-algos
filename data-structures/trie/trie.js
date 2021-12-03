import HashTable from '../hash-table/hash-table'

class TrieNode {
	constructor(character, isCompleteWord = false) {
		this.character = character
		this.isCompleteWord = isCompleteWord
		this.children = new HashTable()
	}

	getChild(character) {
		return this.children.get(character)
	}

	addChild(character, isCompleteWord = false) {
		if (!this.children.has(character)) {
			this.children.set(character, new TrieNode(character, isCompleteWord))
		}

		const childNode = this.children.get(character)

		// In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
		childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord

		return childNode
	}

	removeChild(character) {
		const childNode = this.getChild(character)

		// Delete childNode only if:
		// - childNode has NO children,
		// - childNode.isCompleteWord === false.
		if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
			this.children.delete(character)
		}

		return this
	}

	hasChild(character) {
		return this.children.has(character)
	}

	//  Check whether current TrieNode has children or not.

	hasChildren() {
		return this.children.getKeys().length !== 0
	}

	suggestChildren() {
		return [...this.children.getKeys()]
	}

	toString() {
		let childrenAsString = this.suggestChildren().toString()
		childrenAsString = childrenAsString ? `:${childrenAsString}` : ''
		const isCompleteString = this.isCompleteWord ? '*' : ''

		return `${this.character}${isCompleteString}${childrenAsString}`
	}
}

// Character that we will use for trie tree root.
const HEAD_CHARACTER = '*'

export default class Trie {
	constructor() {
		this.head = new TrieNode(HEAD_CHARACTER)
	}

	addWord(word) {
		const characters = Array.from(word)
		let currentNode = this.head

		for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
			const isComplete = charIndex === characters.length - 1
			currentNode = currentNode.addChild(characters[charIndex], isComplete)
		}

		return this
	}

	deleteWord(word) {
		const depthFirstDelete = (currentNode, charIndex = 0) => {
			if (charIndex >= word.length) {
				// Return if we're trying to delete the character that is out of word's scope.
				return
			}

			const character = word[charIndex]
			const nextNode = currentNode.getChild(character)

			if (nextNode == null) {
				// Return if we're trying to delete a word that has not been added to the Trie.
				return
			}

			// Go deeper.
			depthFirstDelete(nextNode, charIndex + 1)

			// Since we're going to delete a word let's un-mark its last character isCompleteWord flag.
			if (charIndex === word.length - 1) {
				nextNode.isCompleteWord = false
			}

			// childNode is deleted only if:
			// - childNode has NO children
			// - childNode.isCompleteWord === false
			currentNode.removeChild(character)
		}

		// Start depth-first deletion from the head node.
		depthFirstDelete(this.head)

		return this
	}

	suggestNextCharacters(word) {
		const lastCharacter = this.getLastCharacterNode(word)

		if (!lastCharacter) {
			return null
		}

		return lastCharacter.suggestChildren()
	}

	//  Check if complete word exists in Trie.

	doesWordExist(word) {
		const lastCharacter = this.getLastCharacterNode(word)

		return !!lastCharacter && lastCharacter.isCompleteWord
	}

	getLastCharacterNode(word) {
		const characters = Array.from(word)
		let currentNode = this.head

		for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
			if (!currentNode.hasChild(characters[charIndex])) {
				return null
			}

			currentNode = currentNode.getChild(characters[charIndex])
		}

		return currentNode
	}
}

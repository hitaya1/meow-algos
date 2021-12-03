// Return the number of bits used in the binary representation of the number.
function bitLength(number) {
	let bitsCounter = 0

	while (1 << bitsCounter <= number) {
		bitsCounter += 1
	}

	return bitsCounter
}

// Counts the number of bits that need to be change in order to convert numberA to numberB
function bitsDiff(numberA, numberB) {
	return countSetBits(numberA ^ numberB)
}

function clearBit(number, bitPosition) {
	const mask = ~(1 << bitPosition)
	return number & mask
}

function countSetBits(originalNumber) {
	let setBitsCount = 0
	let number = originalNumber

	while (number) {
		// Add last bit of the number to the sum of set bits.
		setBitsCount += number & 1

		// Shift number right by one bit to investigate other bits.
		number >>>= 1
	}

	return setBitsCount
}

function divideByTwo(number) {
	return number >> 1
}

// Add two numbers using only binary operators.
// This is an implementation of full adders logic circuit.
// https://en.wikipedia.org/wiki/Adder_(electronics)
// Inspired by: https://www.youtube.com/watch?v=wvJc9CZcvBc

// Table(1)
//  INPUT  | OUT
//  C Ai Bi | C Si | Row
// -------- | -----| ---
//  0  0  0 | 0  0 | 1
//  0  0  1 | 0  1 | 2
//  0  1  0 | 0  1 | 3
//  0  1  1 | 1  0 | 4
// -------- | ---- | --
//  1  0  0 | 0  1 | 5
//  1  0  1 | 1  0 | 6
//  1  1  0 | 1  0 | 7
//  1  1  1 | 1  1 | 8
// ---------------------

// Legend:
// INPUT C = Carry in, from the previous less-significant stage
// INPUT Ai = ith bit of Number A
// INPUT Bi = ith bit of Number B
// OUT C = Carry out to the next most-significant stage
// OUT Si = Bit Sum, ith least significant bit of the result

export default function fullAdder(a, b) {
	let result = 0
	let carry = 0

	// The operands of all bitwise operators are converted to signed
	// 32-bit integers in two's complement format.
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Signed_32-bit_integers
	for (let i = 0; i < 32; i += 1) {
		const ai = getBit(a, i)
		const bi = getBit(b, i)
		const carryIn = carry

		// Calculate binary Ai + Bi without carry (half adder)
		// See Table(1) rows 1 - 4: Si = Ai ^ Bi
		const aiPlusBi = ai ^ bi

		// Calculate ith bit of the result by adding the carry bit to Ai + Bi
		// For Table(1) rows 5 - 8 carryIn = 1: Si = Ai ^ Bi ^ 1, flip the bit
		// Fpr Table(1) rows 1 - 4 carryIn = 0: Si = Ai ^ Bi ^ 0, a no-op.
		const bitSum = aiPlusBi ^ carryIn

		// Carry out one to the next most-significant stage
		// when at least one of these is true:
		// 1) Table(1) rows 6, 7: one of Ai OR Bi is 1 AND carryIn = 1
		// 2) Table(1) rows 4, 8: Both Ai AND Bi are 1
		const carryOut = (aiPlusBi & carryIn) | (ai & bi)
		carry = carryOut

		// Set ith least significant bit of the result to bitSum.
		result |= bitSum << i
	}

	return result
}

function getBit(number, bitPosition) {
	return (number >> bitPosition) & 1
}

function isEven(number) {
	return (number & 1) === 0
}

function isPositive(number) {
	// Zero is neither a positive nor a negative number.
	if (number === 0) {
		return false
	}

	// The most significant 32nd bit can be used to determine whether the number is positive.
	return ((number >> 31) & 1) === 0
}

function isPowerOfTwo(number) {
	return (number & (number - 1)) === 0
}

//  Multiply two signed numbers using bitwise operations.

//  If a is zero or b is zero or if both a and b are zeros:
//  multiply(a, b) = 0

//  If b is even:
//  multiply(a, b) = multiply(2a, b/2)

//  If b is odd and b is positive:
//  multiply(a, b) = multiply(2a, (b-1)/2) + a

//  If b is odd and b is negative:
//  multiply(a, b) = multiply(2a, (b+1)/2) - a

function multiply(a, b) {
	// If a is zero or b is zero or if both a and b are zeros then the production is also zero.
	if (b === 0 || a === 0) {
		return 0
	}

	// Otherwise we will have four different cases that are described above.
	const multiplyByOddPositive = () =>
		multiply(multiplyByTwo(a), divideByTwo(b - 1)) + a
	const multiplyByOddNegative = () =>
		multiply(multiplyByTwo(a), divideByTwo(b + 1)) - a

	const multiplyByEven = () => multiply(multiplyByTwo(a), divideByTwo(b))
	const multiplyByOdd = () =>
		isPositive(b) ? multiplyByOddPositive() : multiplyByOddNegative()

	return isEven(b) ? multiplyByEven() : multiplyByOdd()
}

function multiplyByTwo(number) {
  return number << 1;
}


//  Multiply to unsigned numbers using bitwise operator.
//  The main idea of bitwise multiplication is that every number may be split
//  to the sum of powers of two:
//  I.e. 19 = 2^4 + 2^1 + 2^0
//  Then multiplying number x by 19 is equivalent of:
// x * 19 = x * 2^4 + x * 2^1 + x * 2^0
//  Now we need to remember that (x * 2^4) is equivalent of shifting x left by 4 bits (x << 4).

 export default function multiplyUnsigned(number1, number2) {
  let result = 0;

  // Let's treat number2 as a multiplier for the number1.
  let multiplier = number2;

  // Multiplier current bit index.
  let bitIndex = 0;

  // Go through all bits of number2.
  while (multiplier !== 0) {
    // Check if current multiplier bit is set.
    if (multiplier & 1) {
      // In case if multiplier's bit at position bitIndex is set
      // it would mean that we need to multiply number1 by the power
      // of bit with index bitIndex and then add it to the result.
      result += (number1 << bitIndex);
    }

    bitIndex += 1;
    multiplier >>= 1;
  }

  return result;
}

function setBit(number, bitPosition) {
  return number | (1 << bitPosition);
}

function switchSign(number) {
  return ~number + 1;
}

function updateBit(number, bitPosition, bitValue) {
  // Normalized bit value.
  const bitValueNormalized = bitValue ? 1 : 0;

  // Init clear mask.
  const clearMask = ~(1 << bitPosition);

  // Clear bit value and then set it up to required value.
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

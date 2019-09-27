import {divide, multiply, subtract, sum} from '../../../../../solutions/world-1/1-1';
import {TestCase, TestGroup} from '../../../../../shared/tests';

export const tests = [
	new TestGroup({
		name: 'Soma',
		signature: 'sum(a, b)',
		description: 'Escreva uma função que receba dois números, a e b, e retorne a soma deles.',
		fn: sum
	})
	.addCase(
		new TestCase({
			inputs: [1, 1],
			outputs: 2
		})
	).addCase(
		new TestCase({
			inputs: [-8, 10],
			outputs: 2
		})
	).addCase(
		new TestCase({
			inputs: [7, 3],
			outputs: 10
		})
	).addCase(
		new TestCase({
			inputs: [0.5, 1.5],
			outputs: 2
		})
	),
	new TestGroup({
		name: 'Subtração',
		signature: 'subtract(a, b)',
		description: 'Escreva uma função que receba dois números, a e b, e retorne a subtração deles.',
		fn: subtract
	})
	.addCase(
		new TestCase({
			inputs: [1, 1],
			outputs: 0
		})
	).addCase(
		new TestCase({
			inputs: [-8, 10],
			outputs: -18
		})
	).addCase(
		new TestCase({
			inputs: [7, 3],
			outputs: 4
		})
	).addCase(
		new TestCase({
			inputs: [0.5, 1],
			outputs: -0.5
		})
	),
	new TestGroup({
		name: 'Multiplicação',
		signature: 'multiply(a, b)',
		description: 'Escreva uma função que receba dois números, a e b, e retorne a multiplicação deles.',
		fn: multiply
	})
		.addCase(
			new TestCase({
				inputs: [1, 1],
				outputs: 1
			})
		).addCase(
		new TestCase({
			inputs: [-8, 10],
			outputs: -80
		})
	).addCase(
		new TestCase({
			inputs: [7, 3],
			outputs: 21
		})
	).addCase(
		new TestCase({
			inputs: [0.5, 1],
			outputs: 0.5
		})
	),
	new TestGroup({
		name: 'Divisão',
		signature: 'divide(a, b)',
		description: 'Escreva uma função que receba dois números, a e b, e retorne a divisão deles.',
		fn: divide
	})
		.addCase(
			new TestCase({
				inputs: [1, 1],
				outputs: 1
			})
		).addCase(
		new TestCase({
			inputs: [-8, 10],
			outputs: -0.8
		})
	).addCase(
		new TestCase({
			inputs: [6, 3],
			outputs: 2
		})
	).addCase(
		new TestCase({
			inputs: [0.5, 0.5],
			outputs: 1
		})
	),
];
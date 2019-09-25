import {subtract, sum} from '../../../../../solutions/world-1/1-1';
import {TestCase, TestGroup} from '../../../../../shared/tests';

export const tests = [
	new TestGroup({
		name: 'Soma',
		signature: 'sum(a, b)',
		fn: sum
	})
	.addCase(
		new TestCase({
			inputs: [10, 12],
			outputs: 22
		})
	),
	new TestGroup({
		name: 'Subtração',
		signature: 'subtract(a, b)',
		fn: subtract
	})
	.addCase(
		new TestCase({
			inputs: [12, 10],
			outputs: 2
		})
	),
];
import {sum} from '../../../../../solutions/world-1/1-1';
import {TestCase, TestGroup} from '../../../../../shared/tests';

export const tests = new TestGroup({
		name: 'Soma',
		fn: sum
	})
	.addCase(
		new TestCase({
			inputs: [10, 12],
			outputs: 22
		})
	);
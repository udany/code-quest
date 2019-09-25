<template>
	<div>
		<h3>Playground</h3>

		<input type="number" v-model.number="a">
		<input type="number" v-model.number="b">
		<b>{{sum}}</b>

		<h3>Tests</h3>
		<h4>{{tests.name}}</h4>
		<div v-for="(testCase, idx) in tests.cases" :key="idx">
			<span v-if="tests.run(testCase)">
				NICE
			</span>
			<span v-else>
				Geez...
			</span>
		</div>
	</div>
</template>

<script>
	import { tests } from './tests';
	import {sum} from '../../../../../solutions/world-1/1-1';

	export default {
		name: 'Level-1-1',
		world: 1,
		level: 1,
		data: () => ({
			a: 15,
			b: 1,
			tests
		}),
		computed: {
			sum() {
				return sum(this.a, this.b);
			}
		}
	}
</script>

<style lang="scss" scoped></style>

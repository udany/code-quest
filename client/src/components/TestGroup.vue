<template>
	<div class="cq-test-box mt-5">
		<button class="btn btn-sm btn-primary float-right" data-toggle="collapse" @click="collapsed=!collapsed">
			<fa-icon>eye</fa-icon> Detalhes
		</button>

		<h3
			class="text-default"
			:class="passing ? 'text-success' : 'text-danger'"
		>
			<fa-icon>{{passing ? 'check' : 'times'}}</fa-icon>

			{{test.name}}

			<code v-if="test.signature">{{test.signature}}</code>
		</h3>

		<cq-collapse :collapsed="collapsed">
			<div v-for="(testCase, idx) in test.cases" :key="idx" class="cq-test-case">
				<h5
					class="text-default"
					:class="test.run(testCase) ? 'text-success' : 'text-danger'"
				>
					<fa-icon>{{test.run(testCase) ? 'check' : 'times'}}</fa-icon>
					Caso {{idx}}
				</h5>

				<template v-if="testCase.inputs && testCase.inputs.length">
					<b>Entradas: </b> <code>{{testCase.inputs.toString()}}</code><br>
				</template>

				<b>Saída: </b> <code>{{caseOutput(testCase)}}</code>

				<template v-if="!test.run(testCase)">
					<br>
					<b>Saída esperada: </b> <code>{{testCase.outputs.toString()}}</code>
				</template>
			</div>
		</cq-collapse>
	</div>
</template>

<script>
	import {TestGroup} from '../../../shared/tests';
	import CqCollapse from './CqCollapse';
	import FaIcon from './FaIcon';

	export default {
		name: 'TestGroup',
		components: {FaIcon, CqCollapse},
		data: () => ({
			collapsed: true
		}),
		props: {
			test: {
				type: TestGroup,
				required: true
			}
		},
		computed: {
			passing() {
				return this.test.run();
			}
		},
		methods: {
			caseOutput(testCase) {
				const r = this.test.fn(...testCase.inputs);

				if (r === undefined) {
					return 'undefined';
				} else {
					return r.toString();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cq-test-box {
		padding: 1em 1.5em;
		background: rgba(white, .1);

		.cq-test-case {
			margin-top: 15px;
		}
	}
</style>

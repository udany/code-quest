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

		<CqMarkdown v-if="test.description" :value="test.description"></CqMarkdown>

		<cq-collapse :collapsed="collapsed">
			<div v-for="(testCase, idx) in test.cases" :key="idx" class="cq-test-case">
				<h5
					class="text-default"
					:class="test.test(testCase) ? 'text-success' : 'text-danger'"
				>
					<fa-icon>{{test.test(testCase) ? 'check' : 'times'}}</fa-icon>
					Caso {{idx}}
				</h5>

				<template v-if="testCase.inputs && testCase.inputs.length">
					<b>Entradas: </b>
					<span
						v-for="(input, idx) of testCase.inputs"
						:key="idx"
					>
						<code class="">{{valueToString(input)}}</code>{{idx+1 !== testCase.inputs.length ? ', ' : ``}}
					</span>
					<br>
				</template>

				<b>Saída: </b> <code>{{caseOutput(testCase)}}</code>

				<template v-if="!test.test(testCase)">
					<br>
					<b>Saída esperada: </b> <code>{{JSON.stringify(testCase.outputs)}}</code>
				</template>
			</div>
		</cq-collapse>
	</div>
</template>

<script>
	import {TestGroup} from '../../../shared/tests';
	import CqCollapse from './CqCollapse';
	import FaIcon from './FaIcon';
	import CqMarkdown from './CqMarkdown';

	export default {
		name: 'TestGroup',
		components: {CqMarkdown, FaIcon, CqCollapse},
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
				return this.test.test();
			}
		},
		methods: {
			caseOutput(testCase) {
				const r = this.test.run(testCase);

				return this.valueToString(r);
			},
			valueToString(v) {
				if (v === undefined) {
					return 'undefined';
				} else {
					return JSON.stringify(v);
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

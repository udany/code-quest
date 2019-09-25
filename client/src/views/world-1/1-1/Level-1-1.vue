<template>
	<div>
		<h3>Lv 1-1 - Molhando os pés</h3>

		<div class="col-sm-12">
			<blockquote class="blockquote text-center" style="padding: 1em 1em">
				<p class="mb-0">
					Pessoas más raramente tem tempo para ler, é um dos motivos pra sua maldade.
				</p>

				<footer class="blockquote-footer">
					Lemony Snicket em
					<cite title="A Series of Unfortunate Events: The Penultimate Peril">The Penultimate Peril</cite>
				</footer>
			</blockquote>
		</div>

		<div class="col-sm">
			<p>
				Para começar vamos com algo simples, abra o arquivo <code>solutions/world-1/1-1/index.js</code> e preencha as funções
				nele para que elas retornem os resultados esperados, os testes abaixo irão atualizar conforme você for completando elas.
			</p>
		</div>

		<test-group v-for="test in tests" :key="tests.name" :test="test"></test-group>
	</div>
</template>

<script>
	import { tests } from './tests';
	import {sum} from '../../../../../solutions/world-1/1-1';
	import TestGroup from '../../../components/TestGroup';

	export default {
		name: 'Level-1-1',
		components: {TestGroup},
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

<template>
	<div>
		<h3>Lv 1-1 - Molhando os pés</h3>

		<Quotes author="Lemony Snicket" book="The Penultimate Peril">
			Pessoas más raramente tem tempo para ler, é um dos motivos pra sua maldade.
		</Quotes>

		<p>
			Para começar vamos com algo simples, abra o arquivo <code>solutions/world-1/1-1/index.js</code> e preencha as funções
			nele para que elas retornem os resultados esperados, os testes abaixo irão atualizar conforme você for completando elas.
		</p>

		<test-group v-for="test in tests" :key="test.name" :test="test"></test-group>
	</div>
</template>

<script>
	import { tests } from './tests';
	import TestGroup from '../../../components/TestGroup';
	import Quotes from "../../../components/Quotes";

	export default {
		name: 'Level-1-1',
		components: {Quotes, TestGroup},
		info: {
			world: 1,
			level: 1,
			title: 'Molhando os pés'
		},
		data: () => ({
			tests
		}),
	}
</script>

<style lang="scss" scoped></style>

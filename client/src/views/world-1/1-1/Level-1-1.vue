<template>
	<div>
		<h3>1-1 - Molhando os pés</h3>

		<SolutionSyncManager :level="1" :world="1" />

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
	import SolutionSyncManager from "../../../components/SolutionSyncManager";

	const info = {
		world: 1,
		level: 1,
		title: 'Molhando os pés'
	};

	export default {
		name: 'Level-1-1',
		components: {SolutionSyncManager, Quotes, TestGroup},
		info,
		metaInfo (){
			return {
				title: `${info.world}-${info.level} ${info.title}`
			}
		},
		data: () => ({
			tests
		}),
	}
</script>

<style lang="scss" scoped></style>

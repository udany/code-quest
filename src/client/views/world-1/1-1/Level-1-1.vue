<template>
	<div>
		<h3>1-1 - Molhando os pés</h3>

		<Quotes author="Lemony Snicket" book="The Penultimate Peril">
			Pessoas más raramente tem tempo para ler, é um dos motivos pra sua maldade.
		</Quotes>

		<p>
			Para começar vamos com algo simples, abra o arquivo <code>solutions/world-1/1-1/index.js</code> e preencha as funções
			nele para que elas retornem os resultados esperados, os testes abaixo irão atualizar conforme você for completando elas.
		</p>

		<CodeEditor :world="info.world" :level="info.level" />

		<tests-1-1 />
	</div>
</template>

<script>
	import Quotes from "../../../components/Quotes.vue";

	import CodeEditor from '../../../components/CodeEditor.vue';
	import Tests11 from './Tests-1-1.vue';

	const info = {
		world: 1,
		level: 1,
		title: 'Molhando os pés'
	};

	export default {
		name: 'Level-1-1',
		components: { Tests11, CodeEditor, Quotes },
		info,
		metaInfo (){
			return {
				title: `${info.world}-${info.level} ${info.title}`
			}
		},
		data: () => ({
			info
		}),
	}
</script>

<style lang="scss" scoped></style>

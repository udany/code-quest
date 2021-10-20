<template>
    <div>
        <h3>1-2 - Andando pro fundo</h3>

		<Quotes author="Lemony Snicket" book="The Austere Academy">
			Ler é uma forma de escape, correr pela sua vida é outra.
		</Quotes>

		<p>
			Okay, agora que você já está aquecido vamos para algo mais... <em>Interessante</em>...
		</p>

		<p>
			Abra o arquivo <code>solutions/world-1/1-2/index.js</code> e preencha as funções que nem no nível anterior.
			Ah, e caso você esteja se perguntando como obter o valor de pi...

			<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI" target="_blank">
				Fica a dica!
			</a>
		</p>

		<CodeEditor :world="info.world" :level="info.level" />

		<tests-1-2 />
    </div>
</template>

<script>
	import Quotes from "../../../components/Quotes.vue";
	import CodeEditor from '../../../components/CodeEditor.vue';
	import Tests12 from './Tests-1-2.vue';

    const info = {
	    world: 1,
	    level: 2,
	    title: 'Andando pro fundo'
    };

    export default {
        name: "Level-1-2",
        components: { Tests12, CodeEditor, Quotes },
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

<style scoped>

</style>

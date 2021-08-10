<template>
    <div>
        <h3>1-2 - Andando pro fundo</h3>

		<SolutionSyncManager :level="2" :world="1" :tests="tests" />

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

        <test-group v-for="test in tests" :key="test.name" :test="test"></test-group>
    </div>
</template>

<script>
	import Quotes from "../../../components/Quotes.vue";
	import TestGroup from "../../../components/TestGroup.vue";
	import SolutionSyncManager from '../../../components/SolutionSyncManager.vue';

    import {tests} from "./tests";

    const info = {
	    world: 1,
	    level: 2,
	    title: 'Andando pro fundo'
    };

    export default {
        name: "Level-1-2",
        components: { SolutionSyncManager, Quotes, TestGroup},
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

<style scoped>

</style>
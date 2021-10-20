<template>
    <div>
        <h3>1-3 - Começando a nadar</h3>

        <div class="col-sm-12">
            <Quotes author="Lemony Snicket" book="The Vile Village">
				Não importa quem você é, onde você mora, ou quantas pessoas estão te perseguindo,
				o que você não lê é frequentemente tão importante quanto o que você lê.
            </Quotes>
        </div>

        <div class="col-sm me-4">
            <p>
                Continuando nessa linha de funções matemáticas, implemente as seguintes funções no seu
                arquivo <code>solutions/world-1/1-3/index.js</code>.
            </p>
        </div>

		<CodeEditor :world="info.world" :level="info.level" />

		<tests-1-3 />
    </div>
</template>

<script>
	import Quotes from "../../../components/Quotes.vue";

	import CodeEditor from '../../../components/CodeEditor.vue';
	import Tests13 from './Tests-1-3.vue';

    const info = {
	    world: 1,
	    level: 3,
	    title: 'Começando a nadar'
    };

    export default {
        name: "Level-1-3",
        components: { Tests13, CodeEditor, Quotes },
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

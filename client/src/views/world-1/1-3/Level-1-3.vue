<template>
    <div>
        <h3>Lv 1-3 - Começando a nadar</h3>

        <div class="col-sm-12">
            <Quotes author="Lemony Snicket" book="The Vile Village">
				Não importa quem você é, onde você mora, ou quantas pessoas estão te perseguindo,
				o que você não lê é frequentemente tão importante quanto o que você lê.
            </Quotes>
        </div>

        <div class="col-sm">
            <p>
                Continuando nessa linha de funções matemáticas, implemente as seguintes funções no seu
                arquivo <code>solutions/world-1/1-3/index.js</code>.
            </p>
        </div>

        <test-group v-for="test in tests" :key="test.name" :test="test"></test-group>
    </div>
</template>

<script>
    import Quotes from "../../../components/Quotes";
    import TestGroup from "../../../components/TestGroup";
    import {tests} from "./tests";

    const info = {
	    world: 1,
	    level: 3,
	    title: 'Começando a nadar'
    };

    export default {
        name: "Level-1-3",
        components: {Quotes, TestGroup},
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
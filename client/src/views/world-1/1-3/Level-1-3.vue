<template>
    <div>
        <h3>Lv 1-3 - Começando a nadar</h3>

        <div class="col-sm-12">
            <Quotes
                    quote-text="Não importa quem você é, onde você mora, ou quantas pessoas estão te perseguindo,
                    o que você não lê é frequentemente tão importante quanto o que você lê."
                    author="Lemony Snicket"
                    book="The Vile Village">
            </Quotes>
        </div>

        <div class="col-sm">
            <p>
                Certo, parece que temos um profissional aqui! Vamos ver como você se sai agora...
            </p>
            <p>
                Já sabe como é, abre logo o <code>solutions/world-1/1-3/index.js</code> =D
            </p>
            <p>Alguns links úteis:</p>

            <ul>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf">indexOf</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/length">length</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split">split</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">reverse</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join">join</a>
                </li>
            </ul>
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
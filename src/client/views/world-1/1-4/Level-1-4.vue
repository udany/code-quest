<template>
    <div>
        <h3>1-4 - Sem engolir água!</h3>

        <div class="col-sm-12">
            <Quotes author="Lemony Snicket" book="Horseradish">
				Só porque algo é tradicional não significa que há razão para fazê-lo, claro.
				A pirataria, por exemplo, é uma tradição que foi perpetuada por centenas de anos,
				mas não significa que devemos todos atacar navios e roubar seu ouro.
            </Quotes>
        </div>

        <div class="col-sm">
            <p>
                Certo, parece que temos um profissional aqui! Vamos ver como você se sai agora...
            </p>
            <p>
                Já sabe como é, abre logo o <code>solutions/world-1/1-4/index.js</code> =D
            </p>
            <p>Alguns links úteis:</p>

            <ul>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf">String.indexOf()</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/length">String.length</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/split">String.split()</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse">Array.reverse()</a>
                </li>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/join">Array.join()</a>
                </li>
            </ul>
        </div>

        <CodeEditor :world="info.world" :level="info.level" />

        <tests-1-4 />
    </div>
</template>

<script>
	import Quotes from "../../../components/Quotes.vue";
	import TestGroup from "../../../components/TestGroup.vue";

	import {tests} from "./tests";
    import CodeEditor from "../../../components/CodeEditor.vue";
    import Tests14 from "./Tests-1-4.vue";

    const info = {
        world: 1,
        level: 4,
        title: 'Sem engolir água!'
    };

    export default {
        name: "Level-1-4",
        components: {Tests14, CodeEditor, Quotes, TestGroup},
        info,
        metaInfo (){
            return {
                title: `${info.world}-${info.level} ${info.title}`
            }
        },
        data: () => ({
            tests,
            info
        }),
    }
</script>

<style scoped>

</style>
<template>
    <div>
        <h3>1-5 - Gasp! Glub glub glub...</h3>

        <div class="col-sm-12">
            <Quotes author="Lemony Snicket" book="Horseradish">
                Há muito tempo atrás, não havia essa coisa de escolas, e as crianças gastavam seus dias aprendendo
                uma profissão, uma frase que aqui quer dizer "em pé fazendo tarefas entediantes sob instrução de um
                adulto mandão". Eventualmente, no entanto, as pessoas perceberam que podiam deixar que as crianças se
                sentassem, e assim a primeira escola foi inventada.
            </Quotes>
        </div>

        <div class="col-sm">
            <p>
                Se você chegou até aqui, com certeza já está pronto pra brincar com arrays!!
            </p>
            <p>
                Então vamos lá, pode abrir o <code>solutions/world-1/1-5/index.js</code> e começar a programar!
            </p>
            <p>Alguns links úteis:</p>

            <ul>
                <li>
                    <a target="_blank" href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">Array.forEach()</a>
                </li>
            </ul>
        </div>

        <test-group v-for="test in tests" :key="test.name" :test="test"></test-group>
    </div>
</template>

<script>
    import Quotes from "../../../components/Quotes.vue";
    import TestGroup from "../../../components/TestGroup.vue";

    import {tests} from "./tests";

    const info = {
        world: 1,
        level: 5,
        title: 'Gasp! Glub glub...'
    };

    export default {
        name: "Level-1-5",
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
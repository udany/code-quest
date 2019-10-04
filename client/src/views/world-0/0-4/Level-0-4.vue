<template>
    <div>
        <h2>
            {{info.title}}
        </h2>

        <p>
            Em programação, um loop é uma estrutura que permite realizar o mesmo conjunto de operações repetidas
            vezes - o que é chamado de <b>iteração</b> na linguagem de programação.<br>
            Um loop geralmente é composto por 3 itens:
        </p>
        <ul>
            <li>
                Um <b>contador</b>, que é inicializado com um valor, determinando o ponto de início do loop;
            </li>
            <li>
                Uma <b>condição de saída</b>, que é o critério no qual o loop para (geralmente o contador atinge
                um certo valor);
            </li>
            <li>
                Um <b>iterador</b>, responsável por alterar o valor do contador após cada execução do loop.
            </li>
        </ul>
        <p>
            Em Javascript, existem 2 principais estruturas que funcionam como loops: o <code>for</code> e o <code>while</code>.
        </p>

        <h3>
            For loop
        </h3>

        <cq-code>
            for (let i = 0; i < 10; i++) {
            console.log(i);
            }
        </cq-code>

        <p>
            No <code>for loop</code>, primeiro você diz qual a variável que será usada como contador, depois você informa
            a condição de saída do loop, e por fim você especifica o iterador, que irá alterar o valor do contador.
        </p>

        <p>
            No exemplo acima, o contador é a variável <code>i</code>, a condição de saída é <code>i < 10</code>, o que
            significa que enquanto o valor de <code>i</code> for menor que 10, o loop continuará sendo executado, e o
            iterador é <code>i++</code>, indicando que ao final de cada <b>iteração</b> do loop, o valor de <code>i</code>
            deve ser incrementado em 1.
        </p>

        <p>
            <b>Dica 1:</b> No exemplo acima, a variável utilizada como contador foi declarada na própria estrutura do loop,
            porém isso, apesar de bastante comum, não é regra: você pode usar uma variável declarada anteriormente.
        </p>

        <cq-code>
            let i = 0;
            for (i; i < 10; i = i + 2) {
            console.log(i);
            }
        </cq-code>

        <p>
            <b>Dica 2:</b> <code>i++</code> é apenas uma forma diferente de escrever <code>i = i + 1</code>, assim como
            <code>i--</code> é outra forma de escrever <code>i = i - 1</code>. O iterador pode ser escrito da sua
            maneira desejada, contanto que altere o valor do contador corretamente.
        </p>

        <h3>
            While loop
        </h3>

        <cq-code>
            let i = 0;
            while (i < 10) {
            console.log(i);
            i++;
            }
        </cq-code>

        <p>
            No <code>while loop</code>, você começa especificando a condição de saída, e o iterador é definido dentro do
            próprio loop, nesse caso o iterador é o <code>i++</code>. Além disso, diferentemente do <code>for loop</code>
            , a variável utilizada como contador deve ser declarada antes do loop.
        </p>

        <p>
            O <code>while loop</code> possui uma variação, o <code>do...while loop</code>, que, resumidamente, coloca
            o código a ser executado pelo loop antes da condição de saída.
        </p>

        <cq-code>
            let i = 0;
            do {
            console.log(i);
            i++;
            } while (i < 10);
        </cq-code>

        <p>
            Essa alteração faz com que o loop sempre seja executado uma primeira vez, antes de checar se o contador
            obedece a condição de saída.
        </p>

        <cq-code>
            let i = 10;               ||    let i = 10;
            while (i < 10) {          ||    do {
            console.log(i);           ||    console.log(i);
            i++;                      ||    i++;
            }                         ||    } while(i < 10);
            // O console.log não      ||    // O console.log será
            // será executado         ||    // executado 1 vez.
        </cq-code>
    </div>
</template>

<script>
    import CqCode from '../../../components/CqCode';
    const info = {
        world: 0,
        level: 4,
        title: 'Loops'
    };

    export default {
        name: 'Level-0-4',
        components: {CqCode},
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

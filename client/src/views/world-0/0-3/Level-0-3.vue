<template>
    <div>
        <h2>
            {{info.title}}
        </h2>

        <p>
            Estruturas condicionais em Javascript são utilizadas para verificar uma condição e definir se algo deve
            ou não acontecer.<br>
            Um bom exemplo disso, e que não tem nada a ver com programação, é a linguagem que utilizamos para nos
            comunicar:
            <br>
            <br>
            <i>Se cancelarem a aula de hoje, vou para a mureta.</i>
            <br>
            <br>
            Temos uma condição (se cancelarem a aula de hoje) para executar uma ação (vou para a mureta) dependendo do
            resultado dessa condição. Se verdadeira, a ação é executada.
        </p>

        <p>
            Em Javascript, podemos utilizar de duas estruturas diferentes de condicionais: o <code>if</code> e
            o <code>switch</code>.
        </p>

        <h3>
            O if statement
        </h3>

        <p>
            O <code>if</code> é a principal e mais simples estrutura de condicional no Javascript. Ela testa se uma
            dada condição é verdadeira, executando um bloco de código caso seja.
        </p>

        <cq-code>
            let x = 5;
            if (x > 5) {
            console.log('X é maior que 5.');
            }
            //O console.log() não é executado.
        </cq-code>

        <p>
            Além disso, o <code>if</code> pode conter também a expressão <code>else</code>, que determina um bloco de
            código para ser executado caso a condição seja falsa.
        </p>

        <cq-code>
            let x = 5;
            if (x > 5) {
            console.log('X é maior que 5.');
            } else {
            console.log('X é menor ou igual a 5.');
            //O console.log() executado é este
            }
        </cq-code>

        <p>
            Indo mais além ainda, a expressão <code>else</code> permite que você encadeie outro <code>if</code>,
            para que você cheque múltiplas condições, uma após a outra.
        </p>

        <cq-code>
            let x = 5;
            if (x > 5){
            console.log('X é maior que 5.');
            }else if (x < 5){
            console.log('X é menor que 5.');
            }else{
            console.log('X é igual a 5.');
            //O console.log() executado agora é esse
            }
        </cq-code>

        <p>
            Agora, caso você tenha que fazer uma sequência de <code>if / else</code> muito longa, talvez o que você
            precise na verdade seja...
        </p>

        <h3>
            O switch statement
        </h3>

        <p>
            O <code>switch</code> também permite que você cheque se certas condições são válidas e execute códigos
            diferentes para elas:
        </p>

        <cq-code>
            let x = 5;
            switch (x){
            case 1:
            console.log('X igual a 1');
            break;
            case 2:
            console.log('X igual a 2');
            break;
            case 5:
            console.log('X igual a 5');
            break;
            }
            //O console.log() executado é o último
        </cq-code>

        <p>
            A estrutura <code>switch</code> vai checar se a variável escolhida <code>x</code> assume um dos valores que
            aparecem após as palavras <code>case</code>, e executar os comandos específicos do <code>case</code> correto.
        </p>

        <p>
            <b>Dica:</b> A palavra <code>break</code> é utilizada para dizer ao programa que não precisa continuar
            comparando a variável com os outros casos, pois o caso correto já foi identificado, assim saindo do loop.
        </p>

        <p>
            <b>Dica:</b> O <code>switch</code> aceita um tipo de <code>case</code> específico chamado <code>default</code>,
            que é utilizado como o <code>else</code> do <code>if</code>, ou seja, é o código que será executado caso
            nenhuma das outras condições sejam válidas.
        </p>

        <cq-code>
            let x = 10;
            switch (x){
            case 1:
            console.log('X igual a 1');
            break;
            case 2:
            console.log('X igual a 2');
            break;
            case 5:
            console.log('X igual a 5');
            break;
            default:
            console.log('X não encontrado');
            }
            //O console.log() executado é o último
        </cq-code>
    </div>
</template>

<script>
    import CqCode from '../../../components/CqCode';
    const info = {
        world: 0,
        level: 3,
        title: 'Condicionais'
    };

    export default {
        name: 'Level-0-3',
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

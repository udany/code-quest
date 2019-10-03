import {TestCase, TestGroup} from '../../../../../shared/tests';
import {concat, highestNumber, includes, sum} from "../../../../../solutions/world-1/1-5";


export const tests = [
    new TestGroup({
        name: 'Maior elemento',
        signature: 'highestNumber(arr)',
        description: 'Escreva uma função que receba um array de inteiros e retorne o maior número desse array.',
        fn: highestNumber
    })
        .addCase(
            new TestCase({
                inputs: [[1, 2, 3]],
                outputs: 3
            })
        )
        .addCase(
            new TestCase({
                inputs: [[100, 4, 74]],
                outputs: 100
            })
        )
        .addCase(
            new TestCase({
                inputs: [[-200, 0, 199]],
                outputs: 199
            })
        ),
    new TestGroup({
        name: 'Contém elemento',
        signature: 'includes(arr, a)',
        description: 'Escreva uma função que receba um array e um elemento e diga se o elemento pertence ao array.',
        fn: includes
    })
        .addCase(
            new TestCase({
                inputs: [[1, 2, 3], 2],
                outputs: true
            })
        )
        .addCase(
            new TestCase({
                inputs: [['Oi, ', 'tudo', 'bem?'], 'tudo'],
                outputs: true
            })
        )
        .addCase(
            new TestCase({
                inputs: [['1', '2', '3', '4', '5'], 5],
                outputs: false
            })
        ),
    new TestGroup({
        name: 'Soma',
        signature: 'sum(arr)',
        description: 'Escreva uma função que receba um array de números e retorne a soma dos mesmos.',
        fn: sum
    })
        .addCase(
            new TestCase({
                inputs: [[1, 2, 3]],
                outputs: 6
            })
        )
        .addCase(
            new TestCase({
                inputs: [[-200, 100, 100]],
                outputs: 0
            })
        ),
    new TestGroup({
        name: 'Concatenar',
        signature: 'concat(arr1, arr2)',
        description: 'Escreva uma função que receba dois arrays e concatene os mesmos, retornando um novo array que ' +
            'contém os elementos dos 2 anteriores.',
        fn: concat
    })
        .addCase(
            new TestCase({
                inputs: [[1, 2, 3], [4, 5, 6]],
                outputs: [1, 2, 3, 4, 5, 6]
            })
        )
];
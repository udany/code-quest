import {TestCase, TestGroup} from '../../../../../shared/tests';
import {factorial, pow, squareRoot, triangleCheck} from "../../../../../solutions/world-1/1-3";

export const tests = [
    new TestGroup({
        name: 'Exponenciação',
        signature: 'pow(a, b)',
        description: 'Escreva uma função que receba dois números, a e b, e retorne a elevado a b. ' +
            'P.S: Nada de usar Math.Pow(), você deve implementar a função do zero!',
        fn: pow
    })
        .addCase(
            new TestCase({
                inputs: [1, 1],
                outputs: 1
            })
        ).addCase(
        new TestCase({
            inputs: [2, 2],
            outputs: 4
        })
        ).addCase(
        new TestCase({
            inputs: [2, 5],
            outputs: 32
        })
        ).addCase(
        new TestCase({
            inputs: [3, 3],
            outputs: 27
        })
    ),
    new TestGroup({
        name: 'Fatorial',
        signature: 'factorial(a)',
        description: 'Escreva uma função que receba um número a e retorne o seu fatorial. ' +
            'Fatorial é o produto dos números inteiros positivos consecutivos de um número natural n, menores ou iguais a n',
        fn: factorial
    })
        .addCase(
            new TestCase({
                inputs: [1],
                outputs: 1
            })
        ).addCase(
        new TestCase({
            inputs: [3],
            outputs: 6
        })
    ).addCase(
        new TestCase({
            inputs: [5],
            outputs: 120
        })
    ),
    new TestGroup({
        name: 'Triângulo',
        signature: 'triangleCheck(x, y, z)',
        description: 'Escreva uma função que receba três números, x, y e z, e cheque se esses 3 números formam um triângulo. ' +
            'Para construir um triângulo é necessário que a medida de qualquer um dos lados seja menor que a soma das ' +
            'medidas dos outros dois e maior que o valor absoluto da diferença entre essas medidas.',
        fn: triangleCheck
    })
        .addCase(
            new TestCase({
                inputs: [3, 4, 5],
                outputs: true
            })
        ).addCase(
        new TestCase({
            inputs: [2, 5, 8],
            outputs: false
        })
    ),
    new TestGroup({
        name: 'Raíz quadrada',
        signature: 'squareRoot(a)',
        description: 'Escreva uma função que receba um número a, e retorne a raiz quadrada desse número, caso exista. ' +
            'Caso o número não tenha raiz quadrada inteira, a função deve retornar -1. P.S: Nada de usar Math.sqrt(), ' +
            'você deve implementar a função do zero!',
        fn: squareRoot
    })
        .addCase(
            new TestCase({
                inputs: [4],
                outputs: 2
            })
        ).addCase(
        new TestCase({
            inputs: [25],
            outputs: 5
        })
        ).addCase(
        new TestCase({
            inputs: [17],
            outputs: -1
        })
        ).addCase(
        new TestCase({
            inputs: [144],
            outputs: 12
        })
    )
];
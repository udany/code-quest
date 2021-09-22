import {TestCase, TestGroup} from '../../../../shared/tests';

import {factorial, pow, squareRoot, triangleCheck} from "../../../../solutions/world-1/1-3";

export const tests = [
    new TestGroup({
        name: 'Exponenciação',
        signature: 'pow(a, b)',
        description: 'Receba dois números e retorne `a` elevado a `b`.',
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
		name: 'Raíz quadrada',
		signature: 'squareRoot(a)',
		description: 'Receba um número e retorne a raiz quadrada desse número, caso seja inteira.  \n' +
			'Caso o número não tenha raiz quadrada inteira, a função deve retornar -1.',
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
	),

    new TestGroup({
        name: 'Fatorial',
        signature: 'factorial(a)',
        description: 'Receba um número e retorne o seu fatorial.  \n' +
            '_O **fatorial** de um número natural n é o produto dos números inteiros positivos consecutivos menores ou iguais a n_',
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
        description: 'Receba três números e cheque se esses 3 números formam um triângulo.  \n' +
            '_Para construir um triângulo é necessário que a medida de qualquer um dos lados seja menor que a soma das ' +
            'medidas dos outros dois e maior que o valor absoluto da diferença entre essas medidas._',
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
    )
];

import {TestCase, TestGroup} from '../../../../../shared/tests';
import {hasAtSign, isValidEmail, palindrome} from "../../../../../solutions/world-1/1-3";

export const tests = [
    new TestGroup({
        name: 'Possui um arroba',
        signature: 'hasAtSign(str)',
        description: 'Escreva uma função que receba uma string e cheque se a mesma contém o caractere "@".',
        fn: hasAtSign
    })
        .addCase(
            new TestCase({
                inputs: ["test@test.com"],
                outputs: true
            })
        ).addCase(
        new TestCase({
            inputs: ["aloha.at.test.com"],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: ["email@test@com"],
            outputs: true
        })
        ).addCase(
        new TestCase({
            inputs: ["ólha@teste"],
            outputs: true
        })
        ),
    new TestGroup({
        name: 'Email válido',
        signature: 'isValidEmail(str)',
        description: 'Escreva uma função que receba uma string e cheque se a mesma é um Email válido. ' +
            'Exemplo de Email válido: texto@texto.texto',
        fn: isValidEmail
    })
        .addCase(
            new TestCase({
                inputs: ["test@test.com"],
                outputs: true
            })
        ).addCase(
        new TestCase({
            inputs: ["aloha.at.test.com"],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: ["email@test@com"],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: ["ólha@test"],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: ["@test"],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: [".@test.."],
            outputs: false
        })
    ),
    new TestGroup({
        name: 'Palíndromo',
        signature: 'palindrome(str)',
        description: 'Escreva uma função que receba uma string e cheque se ela é um palíndromo ' +
            '(um palíndromo é uma palavra, frase ou qualquer outra sequência de caracteres que possa ser lida ' +
            'tanto da direita para a esquerda como da esquerda para a direita).',
        fn: palindrome
    })
        .addCase(
            new TestCase({
                inputs: ["arara"],
                outputs: true
            })
        ).addCase(
        new TestCase({
            inputs: ["rodador"],
            outputs: true
        })
    ).addCase(
        new TestCase({
            inputs: ["tattarrattat"],
            outputs: true
        })
    ).addCase(
        new TestCase({
            inputs: ["roma é amor"],
            outputs: true
        })
    ).addCase(
        new TestCase({
            inputs: ["pimentel"],
            outputs: false
        })
    ).addCase(
        new TestCase({
            inputs: ["dpw"],
            outputs: false
        })
    )
];
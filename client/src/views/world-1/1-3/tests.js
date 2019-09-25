import {TestCase, TestGroup} from '../../../../../shared/tests';
import {hasAtSign, isValidEmail, palindrome} from "../../../../../solutions/world-1/1-3";

export const tests = [
    new TestGroup({
        name: 'Possui um arroba',
        signature: 'hasAtSign(str)',
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
import {TestCase, TestGroup} from '../../../../../shared/tests';
import {areaOfCircle, areaOfRectangle, divisor, isOdd, isPrime} from "../../../../../solutions/world-1/1-2";

export const tests = [
    new TestGroup({
        name: 'Divisor',
        signature: 'divisor(a, b)',
        fn: divisor
    })
        .addCase(
            new TestCase({
                inputs: [10, 5],
                outputs: true
            })
        ).addCase(
        new TestCase({
            inputs: [10, 2],
            outputs: true
        })
        ).addCase(
        new TestCase({
            inputs: [10, 9],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: [5, 3],
            outputs: false
        })
    ),
    new TestGroup({
        name: 'Ímpar',
        signature: 'isOdd(a, b)',
        fn: isOdd
    })
        .addCase(
            new TestCase({
                inputs: [2],
                outputs: false
            })
        ).addCase(
        new TestCase({
            inputs: [10],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: [11],
            outputs: true
        })
    ),
    new TestGroup({
        name: 'Área do retângulo',
        signature: 'areaOfRectangle(a, b)',
        fn: areaOfRectangle
    })
        .addCase(
            new TestCase({
                inputs: [10, 10],
                outputs: 100
            })
        ).addCase(
        new TestCase({
            inputs: [2, 5],
            outputs: 10
        })
        ).addCase(
        new TestCase({
            inputs: [5, 1.5],
            outputs: 7.5
        })
    ),
    new TestGroup({
        name: 'Área do círculo',
        signature: 'areaOfCircle(a, b)',
        fn: areaOfCircle
    })
        .addCase(
            new TestCase({
                inputs: [10],
                outputs: 314.1592653589793
            })
        ).addCase(
        new TestCase({
            inputs: [25],
            outputs: 1963.4954084936207
        })
    ),
    new TestGroup({
        name: 'Primo',
        signature: 'isPrime(a, b)',
        fn: isPrime
    })
        .addCase(
            new TestCase({
                inputs: [1],
                outputs: false
            })
        ).addCase(
        new TestCase({
            inputs: [5],
            outputs: true
        })
        ).addCase(
        new TestCase({
            inputs: [7],
            outputs: true
        })
        ).addCase(
        new TestCase({
            inputs: [10],
            outputs: false
        })
        ).addCase(
        new TestCase({
            inputs: [11],
            outputs: true
        })
        ).addCase(
        new TestCase({
            inputs: [12],
            outputs: false
        })
    )
];
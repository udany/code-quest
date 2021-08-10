export function highestNumber(arr){
    //return Math.max(...arr);
    let max = Number.NEGATIVE_INFINITY;

    for (let value of arr) {
        if (value > max) {
            max = value;
        }
    }

    return max;
}

export function includes(arr, a){
    return arr.indexOf(a) != -1;
}


export function arraySum(arr){
    let sum = 0;

    for (let value of arr) {
        sum += value;
    }

    return sum;
}

export function concat(arr1, arr2){
    return [...arr1, ...arr2];
}
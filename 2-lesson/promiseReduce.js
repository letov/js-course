export async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let acc = initialValue;
    for (let key in asyncFunctions) {
        const fnRes = await asyncFunctions[key]();
        acc = reduce(acc, fnRes)
    }
    return acc;
}

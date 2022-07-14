function sum(a) {
    let acc = a;
    let fn = b => sum(acc + b);
    fn.valueOf = () => acc;
    return fn;
}
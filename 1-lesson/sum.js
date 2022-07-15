function sum(a) {
    let acc = a;
    return b => 'undefined' === typeof(b) ? acc : sum(acc + b);
}

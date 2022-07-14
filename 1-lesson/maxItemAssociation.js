function maxItemAssociation(history) {
    let result = [];
    let listIntersection = (list1, list2) => list1.filter( x => list2.includes(x) );
    let i = 0;
    while (i < history.length) {
        let j = i + 1;
        let concatList = history[i];
        while (j < history.length) {
            let intersection = listIntersection(history[i], history[j]);
            if (intersection.length > 0) {
                concatList = concatList.concat(history[j]);
                concatList = [...new Set(concatList)].sort();
            }
            j++;
        }
        result = result.length > concatList.length ? result : concatList;
        i++;
    }
    return result;
}

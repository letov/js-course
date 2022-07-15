function maxItemAssociation(history) {
    let result = [];
    let listIntersection = (list1, list2) => list1.filter( x => list2.includes(x) );
    let i = 0;
    while (i < history.length) {
        let j = 0;
        let concatList = history[i];
        while (j < history.length) {
            if (i !== j) {
                let intersection = listIntersection(history[i], history[j]);
                if (intersection.length > 0) {
                    concatList = concatList.concat(history[j]);
                    concatList = [...new Set(concatList)].sort();
                }
            }
            j++;
        }
        if (concatList.length > 0) {
            let isLengthEq = concatList.length === result.length;
            let isConcatListLengthMore = concatList.length > result.length;
            let isConcatListLexicalFirst = concatList[0] < result[0];
            if (isConcatListLengthMore || (isLengthEq && isConcatListLexicalFirst)) {
                result = concatList;
            }
        }
        i++;
    }
    return result;
}
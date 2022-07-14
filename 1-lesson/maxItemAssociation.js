function maxItemAssociation(history) {
    let result = [];
    let listDiff = (list1, list2) => list1.filter( x => list2.includes(x) );
    let i = 0;
    while (i < history.length) {
        let j = i + 1;
        let currentRecomendationList = history[i];
        while (j < history.length) {
            let diff = listDiff(history[i], history[j]);
            if (diff.length > 0) {
                currentRecomendationList = currentRecomendationList.concat(history[j]);
                currentRecomendationList = [...new Set(currentRecomendationList)].sort();
            }
            j++;
        }
        result = result.length > currentRecomendationList.length ? result : currentRecomendationList;
        i++;
    }
    return result;
}
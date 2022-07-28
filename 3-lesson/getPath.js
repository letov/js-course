const maxParentTagName = 'body';

export function getPath(element) {
    if (null === element || maxParentTagName === element.tagName.toLowerCase()) {
        return '';
    }
    const idSelector = () => element.id.length > 0 ?
        '#' + element.id :
        '';
    const classSelector = () => element.className.length > 0 ?
        element.className.split(' ').reduce((acc, item) => `${acc}.${item}`, '') :
        '';
    const parentSelector = getPath(element.parentElement);
    const currentSelector = `${element.tagName.toLowerCase()}${idSelector()}${classSelector()}`;
    return `${parentSelector} ${currentSelector}`.trim();
}

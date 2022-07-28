import * as fs from 'fs';
import { test, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { getPath } from "getPath";

test('getPath', () => {
    const html = fs.readFileSync('./test.html', 'utf-8');
    const page = new JSDOM(html);
    const testElement = page.window.document.querySelector('#someId2');
    const fullSelector = getPath(testElement);
    expect( fullSelector )
        .toBe("div.someClass1 div#someId1 span.someClass2 p#someId2.someClass3.someClass4");
    expect( testElement.innerHTML )
        .toBe( page.window.document.querySelector(fullSelector).innerHTML );
});

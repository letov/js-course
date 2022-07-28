import { test, expect, vi } from "vitest";
import { promiseReduce } from "promiseReduce";

test("", async () => {
     expect(
         await promiseReduce(
            [
                () => Promise.resolve(1),
                () => new Promise(resolve => setTimeout(() => resolve(2), 1000))
            ],
            (memo, value) => memo * value,
            1
        )
    ).toBe(2);
});

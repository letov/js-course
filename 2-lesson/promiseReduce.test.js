import { test, expect, vi } from "vitest";
import { promiseReduce } from "promiseReduce";

test("", () => {
    expect(promiseReduce(
        [
            () => Promise.resolve(1),
            () => new Promise(resolve => setTimeout(() => resolve(2), 1000))
        ],
        (memo, value) => memo * value,
        1)
    ).rejects.toBe(2);
});
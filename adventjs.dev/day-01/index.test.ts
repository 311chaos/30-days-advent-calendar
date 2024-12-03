import { describe, expect, test } from "vitest";

import { prepareGifts } from "./index";

describe.concurrent("Prepare Gifts", () => {
  test("Returns Array", () => {
    expect(prepareGifts([3, 1, 2, 3, 4, 2, 5])).instanceOf(Array);
  });

  test("Case 1", () => {
    expect(prepareGifts([3, 1, 2, 3, 4, 2, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  test("Case 2", () => {
    expect(prepareGifts([6, 5, 5, 5, 5])).toEqual([5, 6]);
  });

  test("Empty Array", () => {
    expect(prepareGifts([])).toEqual([]);
  });

  test("Single Element", () => {
    expect(prepareGifts([1])).toEqual([1]);
  });
});

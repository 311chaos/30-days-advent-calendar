import { describe, test, expect } from "vitest";
import { isOdd } from "./utils";

describe("Utils", () => {
  test("isOdd", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
  });
});

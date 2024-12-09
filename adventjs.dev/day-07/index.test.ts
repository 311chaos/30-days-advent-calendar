import { describe, test, expect } from "vitest";
import { fixPackages, getInnerParens } from ".";

describe("Day 07", () => {
  test("getInnerParams Case 1", () => {
    const packages = "a(cb)de";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "cb",
      startingAt: 1,
    });
  });

  test("getInnerParams Case 2", () => {
    const packages = "a(bc(def)g)h";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "def",
      startingAt: 4,
    });
  });

  test("getInnerParams Case 3", () => {
    const packages = "abc(def(gh)i)jk";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "gh",
      startingAt: 7,
    });
  });
  test("getInnerParams Case 4", () => {
    const packages = "a(b(c))e";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "c",
      startingAt: 3,
    });
  });

  test("getInnerParams Case 5", () => {
    const packages = "a(b(c)))e";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "c)",
      startingAt: 3,
    });
  });

  test("getInnerParams Case 6", () => {
    const packages = "a(b(c()))e";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "",
      startingAt: 5,
    });
  });

  test("getInnerParams Case 7", () => {
    const packages = "((a))";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "a",
      startingAt: 1,
    });
  });

  test("getInnerParams Case 8", () => {
    const packages = "a";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "a",
      startingAt: -1,
    });
  });

  test("getInnerParams Case 9", () => {
    const packages = "(";
    expect(
      getInnerParens({ searchString: packages, startingAt: 0 })
    ).toStrictEqual({
      searchString: "(",
      startingAt: -1,
    });
  });

  test("Sample Case 1", () => {
    const packages = "a(cb)de";
    expect(fixPackages(packages)).toBe("abcde");
  });

  test("Sample Case 2", () => {
    const packages = "a(bc(def)g)h";
    expect(fixPackages(packages)).toBe("agdefcbh");
  });

  test("Sample Case 3", () => {
    const packages = "abc(def(gh)i)jk";
    expect(fixPackages(packages)).toBe("abcighfedjk");
  });

  test("Sample Case 4", () => {
    const packages = "a(b(c))e";
    expect(fixPackages(packages)).toBe("acbe");
  });

  test("Sample Case 5", () => {
    const packages = "";
    expect(fixPackages(packages)).toBe("");
  });

  test("Sample Case 6", () => {
    const packages = "a";
    expect(fixPackages(packages)).toBe("a");
  });

  test("Sample Case 7", () => {
    const packages = "()";
    expect(fixPackages(packages)).toBe("");
  });

  test("Sample Case 8", () => {
    const packages = "(((())))";
    expect(fixPackages(packages)).toBe("");
  });

  test("Sample Case 9", () => {
    const packages = "(";
    expect(fixPackages(packages)).toBe("(");
  });

  test("Sample Case 10", () => {
    const packages = "(()";
    expect(fixPackages(packages)).toBe("(");
  });
});

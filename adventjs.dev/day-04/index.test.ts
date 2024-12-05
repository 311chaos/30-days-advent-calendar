import { describe, expect, test } from "vitest";

import { createXmasTree, getNthOddNumber } from "./index";

describe("Day 03 - Part 1", () => {
  test("Get Nth Odd Number", () => {
    expect(getNthOddNumber(1)).toBe(1);
    expect(getNthOddNumber(2)).toBe(3);
    expect(getNthOddNumber(3)).toBe(5);
    expect(getNthOddNumber(4)).toBe(7);
    expect(getNthOddNumber(5)).toBe(9);
    expect(getNthOddNumber(6)).toBe(11);
  });

  test("Sample Case 1", () => {
    const expectedOutput = `
____*____
___***___
__*****__
_*******_
*********
____#____
____#____
`.trim();

    expect(createXmasTree(5, "*")).toEqual(expectedOutput);
  });

  test("Sample Case 2", () => {
    const expectedOutput = `
__+__
_+++_
+++++
__#__
__#__
`.trim();

    expect(createXmasTree(3, "+")).toEqual(expectedOutput);
  });

  test("Sample Case 3", () => {
    const expectedOutput = `
_____@_____
____@@@____
___@@@@@___
__@@@@@@@__
_@@@@@@@@@_
@@@@@@@@@@@
_____#_____
_____#_____
`.trim();

    expect(createXmasTree(6, "@")).toEqual(expectedOutput);
  });
});

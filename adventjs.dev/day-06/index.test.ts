import { describe, test, expect } from "vitest";
import { inBox } from ".";

describe("Day 06", () => {
  test("Sample Case 1", () => {
    /* 
        "###",
        "#*#",
        "###"
    */
    const sample = ["###", "#*#", "###"];

    expect(inBox(sample)).toBe(true);
  });

  test("Sample Case 2", () => {
    /* 
        "####",
        "#* #",
        "#  #",
        "####"
      */
    const sample = ["####", "#* #", "#  #", "####"];

    expect(inBox(sample)).toBe(true);
  });
  test("Sample Case 3", () => {
    /* 
        "#####",
        "#   #",
        "#  #*",
        "#####"
      */
    const sample = ["#####", "#   #", "#  #*", "#####"];

    expect(inBox(sample)).toBe(false);
  });
  test("Sample Case 4", () => {
    /* 
        "#####",
        "#   #",
        "#   #",
        "#   #",
        "#####"

      */
    const sample = ["#####", "#   #", "#   #", "#   #", "#####"];

    expect(inBox(sample)).toBe(false);
  });
});

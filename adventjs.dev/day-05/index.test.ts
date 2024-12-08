import { describe, test, expect } from "vitest";
import { organizeShoes, Shoe } from ".";

describe("Day 05", () => {
  test("Sample Case 1", () => {
    const shoes: Shoe[] = [
      { type: "I", size: 38 },
      { type: "R", size: 38 },
      { type: "R", size: 42 },
      { type: "I", size: 41 },
      { type: "I", size: 42 },
    ];
    expect(organizeShoes(shoes)).toStrictEqual([38, 42]);
  });
  test("Sample Case 2", () => {
    const shoes: Shoe[] = [
      { type: "I", size: 38 },
      { type: "R", size: 38 },
      { type: "I", size: 38 },
      { type: "I", size: 38 },
      { type: "R", size: 38 },
    ];
    expect(organizeShoes(shoes)).toStrictEqual([38, 38]);
  });
  test("Sample Case 3", () => {
    const shoes: Shoe[] = [
      { type: "I", size: 38 },
      { type: "R", size: 36 },
      { type: "R", size: 42 },
      { type: "I", size: 41 },
      { type: "I", size: 43 },
    ];
    expect(organizeShoes(shoes)).toStrictEqual([]);
  });
});

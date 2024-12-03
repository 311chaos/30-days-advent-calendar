import { describe, expect, test } from "vitest";

import { organizeInventory } from "./index";

describe("Day 03 - Part 1", () => {
  test("Empty Array should return empty object", () => {
    expect(organizeInventory([])).toEqual({});
  });

  test("Sample Case 1", () => {
    const sampleInput = [
      { name: "book", quantity: 10, category: "education" },
      { name: "book", quantity: 5, category: "education" },
      { name: "paint", quantity: 3, category: "art" },
    ];

    const expectedOutput = {
      education: {
        book: 15,
      },
      art: {
        paint: 3,
      },
    };

    expect(organizeInventory(sampleInput)).toEqual(expectedOutput);
  });

  test("Sample Case 2", () => {
    const sampleInput = [
      { name: "doll", quantity: 5, category: "toys" },
      { name: "car", quantity: 3, category: "toys" },
      { name: "ball", quantity: 2, category: "sports" },
      { name: "car", quantity: 2, category: "toys" },
      { name: "racket", quantity: 4, category: "sports" },
    ];

    const expectedOutput = {
      toys: {
        doll: 5,
        car: 5,
      },
      sports: {
        ball: 2,
        racket: 4,
      },
    };

    expect(organizeInventory(sampleInput)).toEqual(expectedOutput);
  });
});

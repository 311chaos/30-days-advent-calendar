import { describe, expect, test } from "vitest";

import {
  listOne,
  listTwo,
  getSimilarityScore,
  getSumDifferences,
} from "./index";

const sampleListOne = [3, 4, 2, 1, 3, 3];
const sampleListTwo = [4, 3, 5, 3, 9, 3];

describe("Day 01 - Part 1 - Get Sum of Differences", () => {
  test("Sample Case", () => {
    expect(
      getSumDifferences({ listOne: sampleListOne, listTwo: sampleListTwo })
    ).toBe(11);
  });

  test("Challenge Case", () => {
    expect(getSumDifferences({ listOne, listTwo })).toBe(2_580_760);
  });
});

describe("Day 01 - Part 2", () => {
  test("Sample Case", () => {
    expect(
      getSimilarityScore({ listOne: sampleListOne, listTwo: sampleListTwo })
    ).toBe(31);
  });

  test("Challenge Case", () => {
    expect(getSimilarityScore({ listOne, listTwo })).toBe(25_358_365);
  });
});

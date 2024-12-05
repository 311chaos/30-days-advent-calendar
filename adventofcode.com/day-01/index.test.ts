import { describe, expect, test } from "vitest";

import { getSimilarityScore, getSumDifferences } from "./index";
import { getFile } from "../util";

const sampleListOne = [3, 4, 2, 1, 3, 3];
const sampleListTwo = [4, 3, 5, 3, 9, 3];

describe.concurrent("Day 01", async () => {
  const input = await getFile("day-01.txt");

  const fileLines = input.split("\n");

  const listOne = fileLines.map((line) => line.split("   ").map(Number)[0]);
  const listTwo = fileLines.map((line) => line.split("   ").map(Number)[1]);

  describe("Part 1", () => {
    test("Sample Case", () => {
      expect(
        getSumDifferences({ listOne: sampleListOne, listTwo: sampleListTwo })
      ).toBe(11);
    });

    test("Challenge Case", () => {
      expect(getSumDifferences({ listOne, listTwo })).toBe(2_580_760);
    });
  });

  describe("Part 2", () => {
    test("Sample Case", () => {
      expect(
        getSimilarityScore({ listOne: sampleListOne, listTwo: sampleListTwo })
      ).toBe(31);
    });

    test("Challenge Case", () => {
      expect(getSimilarityScore({ listOne, listTwo })).toBe(25_358_365);
    });
  });
});

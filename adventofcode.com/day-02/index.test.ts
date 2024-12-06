import { expect, test, describe } from "vitest";
import {
  areValuesDecreasing,
  areValuesIncreasing,
  areValuesWithinThreshold,
  getDampenedValidReports,
  getValidReports,
  parseInput,
} from ".";
import { getFile } from "../utils";

const sampleInput = `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
        `;

describe("Day 02", async () => {
  const input = await getFile("day-02.txt");

  describe.concurrent("Part 1", () => {
    test("Parse Input", () => {
      const expected = [
        [7, 6, 4, 2, 1],
        [1, 2, 7, 8, 9],
        [9, 7, 6, 2, 1],
        [1, 3, 2, 4, 5],
        [8, 6, 4, 4, 1],
        [1, 3, 6, 7, 9],
      ];

      expect(parseInput(sampleInput)).toEqual(expected);
    });

    describe("Increasing Values", () => {
      test("Returns true when values are increasing", () => {
        const input = [1, 2, 3];
        expect(areValuesIncreasing(input)).toBe(true);
      });

      test("Returns true on Empty Array", () => {
        const input = [];
        expect(areValuesIncreasing(input)).toBe(true);
      });

      test("Returns false on repeating values", () => {
        const input = [1, 1, 2, 3, 4];
        expect(areValuesIncreasing(input)).toBe(false);
      });

      test("Returns false when values are not increasing", () => {
        const input = [3, 2, 1];
        expect(areValuesIncreasing(input)).toBe(false);
      });
    });

    describe("Decreasing Values", () => {
      test("Returns true when values are decreasing", () => {
        const input = [3, 2, 1];
        expect(areValuesDecreasing(input)).toBe(true);
      });

      test("Returns true on Empty Array", () => {
        const input = [];
        expect(areValuesDecreasing(input)).toBe(true);
      });

      test("Returns false on repeating values", () => {
        const input = [3, 3, 2, 1];
        expect(areValuesDecreasing(input)).toBe(false);
      });

      test("Returns false when values are not increasing", () => {
        const input = [1, 2, 3];
        expect(areValuesDecreasing(input)).toBe(false);
      });
    });

    describe("Values within threshold", () => {
      test("Returns true when values are within range", () => {
        expect(areValuesWithinThreshold([1, 2, 3, 4, 5])).toBe(true);
      });

      test("Returns true on Empty Array", () => {
        expect(areValuesWithinThreshold([])).toBe(true);
      });

      test("Returns false when values are not within range", () => {
        expect(areValuesWithinThreshold([1, 6])).toBe(false);
      });
    });

    test("Sample Case", () => {
      const parsedInput = parseInput(sampleInput);
      expect(getValidReports(parsedInput)).toHaveLength(2);
    });

    test("Challenge Case", () => {
      expect(getValidReports(parseInput(input))).toHaveLength(213);
    });
  });

  describe.concurrent("Part 2", () => {
    test("Sample Case", () => {
      expect(getDampenedValidReports(parseInput(sampleInput))).toHaveLength(4);
    });

    test("Challenge Case", () => {
      expect(getDampenedValidReports(parseInput(input))).toHaveLength(285);
    });
  });
});

import { describe, expect, test } from "vitest";

import {
  getFile,
  findStringInMatrix,
  isOdd,
  findCrossInMatrix,
  stringMatchesDirection,
} from "./index";

const sampleInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();

describe("Day 04 - Part 1", () => {
  test("Sample Case", () => {
    const searchString = "XMAS";
    expect(
      findStringInMatrix({ searchInput: sampleInput, searchString })
    ).toHaveLength(18);
  });

  test("Challenge Case", async () => {
    const searchInput = await getFile("input.txt");
    const searchString = "XMAS";
    expect(findStringInMatrix({ searchInput, searchString })).toHaveLength(
      2547
    );
  });
});

describe("Day 04 - Part 2", () => {
  test("isOdd", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(3)).toBe(true);
  });

  test("string Matches Direction", () => {
    const searchString = "MAS";
    const matrix = sampleInput.split("\n").map((row) => row.split(""));

    expect(
      stringMatchesDirection({
        searchString,
        matrix,
        directions: [1, 1],
        startingPosition: [0, 1],
      })
    ).toBeTruthy();
  });

  test("Will throw an error if the search string length is not odd", () => {
    const searchString = "MAS";
    expect(() =>
      findCrossInMatrix({ searchInput: sampleInput, searchString: "XMAS" })
    ).toThrowError();

    expect(() =>
      findCrossInMatrix({ searchInput: sampleInput, searchString })
    ).not.toThrowError();
  });

  test("Sample Case", () => {
    expect(
      findCrossInMatrix({ searchInput: sampleInput, searchString: "MAS" })
    ).toHaveLength(9);
  });

  test("Challenge Case", async () => {
    const searchInput = await getFile("input.txt");

    expect(
      findCrossInMatrix({ searchInput, searchString: "MAS" })
    ).toHaveLength(1939);
  });
});

import { describe, expect, test } from "vitest";

import { getFile, findStringInMatrix } from "./index";

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

import { describe, expect, test } from "vitest";

import { parseInput, processInput, parseInputAdvanced } from "./index";
import { getFile } from "../util";

describe("Day 03 - Part 1", () => {
  describe("Process Input", () => {
    test("Returns matches", () => {
      expect(processInput(["mul(2,4)"])).toEqual(8);
    });

    test("Return matches - multiple args", () => {
      expect(processInput(["mul(2,4)", "mul(9,11)"])).toEqual(107);
    });

    test("Defaults to 0 when no matches found", () => {
      expect(processInput([])).toEqual(0);
      expect(processInput(null)).toEqual(0);
      expect(processInput(undefined)).toEqual(0);
    });
  });

  test("Sample Case", async () => {
    const input =
      "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
    const inputs = parseInput(input);

    expect(processInput(inputs)).toEqual(161);
  });

  test("Challenge Case", async () => {
    const input = await getFile("day-03.txt");
    const inputs = parseInput(input);

    expect(processInput(inputs)).toEqual(185_797_128);
  });
});

describe("Day 03 - Part 2", () => {
  test("Sample Case", async () => {
    const sampleInput =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const inputs = parseInputAdvanced(sampleInput);
    expect(processInput(inputs)).toEqual(48);
  });

  test("Challenge Case", async () => {
    const input = await getFile("day-03.txt");
    const inputs = parseInputAdvanced(input);
    expect(processInput(inputs)).toEqual(89_798_695);
  });
});

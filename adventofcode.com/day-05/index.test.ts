import { describe, test, expect } from "vitest";
import {
  buildRuleMap,
  fixInvalidRules,
  parseRules,
  sumValidPages,
  validatePages,
} from ".";
import { getFile } from "../utils";

describe("Day 05", async () => {
  const sampleInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`.trim();

  const sampleRules = parseRules(sampleInput);
  const sampleRuleMap = buildRuleMap(sampleRules.orderingRules);

  const challengeInput = await getFile("day-05.txt");
  const challengeRules = parseRules(challengeInput);
  const challengeRuleMap = buildRuleMap(challengeRules.orderingRules);

  test("Parsing Rules", () => {
    expect(sampleRules).toStrictEqual({
      orderingRules: [
        [47, 53],
        [97, 13],
        [97, 61],
        [97, 47],
        [75, 29],
        [61, 13],
        [75, 53],
        [29, 13],
        [97, 29],
        [53, 29],
        [61, 53],
        [97, 53],
        [61, 29],
        [47, 13],
        [75, 47],
        [97, 75],
        [47, 61],
        [75, 61],
        [47, 29],
        [75, 13],
        [53, 13],
      ],
      updates: [
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
        [75, 97, 47, 61, 53],
        [61, 13, 29],
        [97, 13, 75, 29, 47],
      ],
    });
  });

  test("Building Rule Map", () => {
    expect(sampleRuleMap[13]).toStrictEqual({
      after: [97, 61, 29, 47, 75, 53],
      // before: [],
    });
  });

  describe("Part 1", () => {
    test("Sample Case", () => {
      const validatedRules = validatePages({
        rules: sampleRules.updates,
        ruleMap: sampleRuleMap,
      });

      expect(validatedRules.validRules).toHaveLength(3);
      expect(sumValidPages(validatedRules.validRules)).toBe(143);
    });

    test("Challenge Case", async () => {
      const validatedRules = validatePages({
        rules: challengeRules.updates,
        ruleMap: challengeRuleMap,
      });

      expect(validatedRules.validRules).toHaveLength(103);
      expect(sumValidPages(validatedRules.validRules)).toBe(6051);
    });
  });
  describe("Part 2", () => {
    test("Sample Case", () => {
      const validatedRules = validatePages({
        rules: sampleRules.updates,
        ruleMap: sampleRuleMap,
      });

      const fixedInvalidRules = fixInvalidRules({
        invalidRules: validatedRules.invalidRules,
        ruleMap: sampleRuleMap,
      });

      expect(fixedInvalidRules).toHaveLength(3);
      expect(fixedInvalidRules).toStrictEqual([
        [97, 75, 47, 61, 53],
        [61, 29, 13],
        [97, 75, 47, 29, 13],
      ]);
      expect(sumValidPages(fixedInvalidRules)).toBe(123);
    });

    test("Challenge Case", async () => {
      const validatedRules = validatePages({
        rules: challengeRules.updates,
        ruleMap: challengeRuleMap,
      });

      const fixedInvalidRules = fixInvalidRules({
        invalidRules: validatedRules.invalidRules,
        ruleMap: challengeRuleMap,
      });

      expect(fixedInvalidRules).toHaveLength(91);
      expect(sumValidPages(fixedInvalidRules)).toBe(5093);
    });
  });
});

import { describe, test, expect } from "vitest";
import {
  addObstacleAndAttemptWalk,
  buildLayoutGrid,
  findInfiniteLoops,
  goForAWalk,
  GuardPosition,
  isOutOfBounds,
  takeStep,
  turnRight,
} from ".";
import { getFile } from "../utils";

describe("Day 06", async () => {
  const sampleInput = `
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`.trim();

  const sampleLayout = buildLayoutGrid(sampleInput);

  const challengeInput = await getFile("day-06.txt");
  const challengeLayout = buildLayoutGrid(challengeInput);

  test("Build Layout", () => {
    expect(sampleLayout).toHaveLength(100);

    expect(
      sampleLayout.find(({ row, col }) => row === 0 && col === 4)
    ).toStrictEqual({
      row: 0,
      col: 4,
      isObstacle: true,
    });

    expect(
      sampleLayout.find(({ row, col }) => row === 6 && col === 4)
    ).toStrictEqual({
      row: 6,
      col: 4,
      isObstacle: false,
      visitedDirections: ["^"],
      isGuardAtPostion: true,
      direction: "^",
    });
  });

  describe("Part 1", () => {
    test("Turn Right", () => {
      const baseGuard: GuardPosition = {
        row: 0,
        col: 0,
        direction: "^",
        visitedDirections: ["^"],
        isGuardAtPostion: true,
        isObstacle: false,
      };

      expect(turnRight({ ...baseGuard, direction: "^" })).toStrictEqual({
        ...baseGuard,
        direction: ">",
      });
      expect(turnRight({ ...baseGuard, direction: ">" })).toStrictEqual({
        ...baseGuard,
        direction: "v",
      });
      expect(turnRight({ ...baseGuard, direction: "v" })).toStrictEqual({
        ...baseGuard,
        direction: "<",
      });
      expect(turnRight({ ...baseGuard, direction: "<" })).toStrictEqual({
        ...baseGuard,
        direction: "^",
      });
    });
    test("Is out of bounds", () => {
      expect(isOutOfBounds({ row: 0, col: 0 }, sampleLayout)).toBe(false);
      expect(isOutOfBounds({ row: -1, col: 0 }, sampleLayout)).toBe(true);
    });

    test("Move Guard", () => {
      expect(
        takeStep({
          row: 6,
          col: 4,
          direction: "^",
          visitedDirections: [],
          isGuardAtPostion: true,
          isObstacle: false,
        })
      ).toStrictEqual({
        row: 5,
        col: 4,
        direction: "^",
        visitedDirections: [],
        isGuardAtPostion: true,
        isObstacle: false,
      });
    });
    test("Sample Case", () => {
      const walkResult = goForAWalk(sampleLayout);

      expect(
        walkResult.filter(
          (spot) =>
            "visitedDirections" in spot && spot.visitedDirections.length > 0
        )
      ).toHaveLength(41);
    });

    test("Challenge Case", async () => {
      const walkResult = goForAWalk(challengeLayout);

      expect(
        walkResult.filter(
          (spot) =>
            "visitedDirections" in spot && spot.visitedDirections.length > 0
        )
      ).toHaveLength(5080);
    });
  });

  describe("Part 2", () => {
    test("addObstacleAndAttemptWalk - Current Guard position", () => {
      expect(addObstacleAndAttemptWalk(sampleLayout, { row: 6, col: 4 })).toBe(
        false
      );
    });

    test("addObstacleAndAttemptWalk - Infinite", () => {
      expect(addObstacleAndAttemptWalk(sampleLayout, { row: 6, col: 3 })).toBe(
        true
      );
    });

    test("addObstacleAndAttemptWalk - First Move requires turn", () => {
      expect(addObstacleAndAttemptWalk(sampleLayout, { row: 5, col: 4 })).toBe(
        false
      );
    });

    test("Sample Case", () => {
      expect(findInfiniteLoops(sampleLayout)).toBe(6);
    });

    // Brute force, so takes a while to run.
    test.skip("Challenge Case", () => {
      expect(findInfiniteLoops(challengeLayout)).toBe(6);
    });
  });
});

import { describe, test, expect } from "vitest";
import {
  buildLayoutGrid,
  goForAWalk,
  GuardPosition,
  isOutOfBounds,
  takeStep,
  turnRight,
} from ".";
import { getFile } from "../utils";

describe("Day 06", () => {
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
      hasVisited: true,
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
        hasVisited: false,
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
          hasVisited: false,
          isGuardAtPostion: true,
          isObstacle: false,
        })
      ).toStrictEqual({
        row: 5,
        col: 4,
        direction: "^",
        hasVisited: false,
        isGuardAtPostion: true,
        isObstacle: false,
      });
    });
    test("Sample Case", () => {
      const walkResult = goForAWalk(sampleLayout);

      expect(
        walkResult.filter((spot) => "hasVisited" in spot && spot.hasVisited)
      ).toHaveLength(41);
    });

    test("Challenge Case", async () => {
      const challengeInput = await getFile("day-06.txt");
      const challengeLayout = buildLayoutGrid(challengeInput);
      const walkResult = goForAWalk(challengeLayout);

      expect(
        walkResult.filter((spot) => "hasVisited" in spot && spot.hasVisited)
      ).toHaveLength(5080);
    });
  });
});

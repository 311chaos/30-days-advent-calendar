type Position = { row: number; col: number };
const GuardDirections = {
  "^": "^",
  v: "v",
  "<": "<",
  ">": ">",
} as const;

type Obstacle = Position & { isObstacle: true };
type Space = Position & {
  isObstacle: false;
  hasVisited: boolean;
  isGuardAtPostion: false;
};

export type GuardPosition = Position & {
  direction: keyof typeof GuardDirections;
  isObstacle: false;
  hasVisited: boolean;
  isGuardAtPostion: true;
};

type Grid = (Obstacle | Space | GuardPosition)[];

export const buildLayoutGrid = (input: string): Grid => {
  return input.split("\n").flatMap((row, rowIndex) => {
    return row.split("").map((col, colIndex) => {
      if (col === "#") {
        return { row: rowIndex, col: colIndex, isObstacle: true };
      }
      if (Object.keys(GuardDirections).includes(col)) {
        return {
          row: rowIndex,
          col: colIndex,
          isGuardAtPostion: true,
          direction: GuardDirections[col],
          isObstacle: false,
          hasVisited: true,
        };
      }

      return {
        row: rowIndex,
        col: colIndex,
        isGuardAtPostion: false,
        isObstacle: false,
        hasVisited: false,
      };
    });
  });
};

export const goForAWalk = (layoutGrid: Grid) => {
  let mappedGrid = [...layoutGrid];

  while (
    !isOutOfBounds(
      mappedGrid.find((g) => "isGuardAtPostion" in g && g.isGuardAtPostion),
      mappedGrid
    )
  ) {
    const currentGuardIndex = mappedGrid.findIndex(
      (spot) => "isGuardAtPostion" in spot && spot.isGuardAtPostion
    );
    const currentGuardPosition = mappedGrid[currentGuardIndex] as GuardPosition;

    //   Figure out where the guard would move
    const nextPosition = takeStep(currentGuardPosition);

    const nextSpotIndex = mappedGrid.findIndex(
      (spot) => spot.row === nextPosition.row && spot.col === nextPosition.col
    );
    const nextSpot = mappedGrid[nextSpotIndex];

    //   Need to update the guard position in the grid as we move.

    if (nextSpot && nextSpot.isObstacle) {
      mappedGrid[currentGuardIndex] = turnRight(currentGuardPosition);
    } else {
      // Actually move the guard
      mappedGrid[currentGuardIndex] = {
        ...mappedGrid[currentGuardIndex],
        isGuardAtPostion: false,
      } as Space;

      mappedGrid[nextSpotIndex] = {
        ...mappedGrid[nextSpotIndex],
        isGuardAtPostion: true,
        hasVisited: true,
        direction: currentGuardPosition.direction,
      } as GuardPosition;
    }
  }

  return mappedGrid;
};

export const turnRight = (guard: GuardPosition): GuardPosition => {
  let { direction } = guard;
  switch (direction) {
    case "^":
      direction = GuardDirections[">"];
      break;
    case "v":
      direction = GuardDirections["<"];
      break;
    case "<":
      direction = GuardDirections["^"];
      break;
    case ">":
      direction = GuardDirections["v"];
      break;
  }
  return { ...guard, direction };
};

export const isOutOfBounds = (
  position: Position | undefined,
  grid: Grid
): boolean => {
  if (!position || !grid) {
    return true;
  }

  return !grid.find(
    ({ col, row }) => col === position.col && row === position.row
  );
};

export const takeStep = (guard: GuardPosition): GuardPosition => {
  let { row, col, direction } = guard;
  switch (direction) {
    case "^":
      row -= 1;
      break;
    case "v":
      row += 1;
      break;
    case "<":
      col -= 1;
      break;
    case ">":
      col += 1;
      break;
  }
  return { ...guard, row, col };
};

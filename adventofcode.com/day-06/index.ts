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
  isGuardAtPostion: false;
  visitedDirections: (keyof typeof GuardDirections)[];
};

export type GuardPosition = Position & {
  direction: keyof typeof GuardDirections;
  isObstacle: false;
  isGuardAtPostion: true;
  visitedDirections: (keyof typeof GuardDirections)[];
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
          visitedDirections: [GuardDirections[col]],
        };
      }

      return {
        row: rowIndex,
        col: colIndex,
        isGuardAtPostion: false,
        isObstacle: false,
        visitedDirections: [],
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

      // Check this spot to ensure that we havent already visited it with the same direction.
      if (nextSpot) {
        if (
          "visitedDirections" in nextSpot &&
          nextSpot.visitedDirections.includes(currentGuardPosition.direction)
        ) {
          throw new Error("INFINITE_LOOP");
        }

        mappedGrid[nextSpotIndex] = {
          ...nextSpot,
          isGuardAtPostion: true,
          visitedDirections:
            "visitedDirections" in nextSpot
              ? [...nextSpot.visitedDirections, currentGuardPosition.direction]
              : [currentGuardPosition.direction],
          direction: currentGuardPosition.direction,
        } as GuardPosition;
      }
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

export const addObstacleAndAttemptWalk = (
  layoutGrid: Grid,
  position: Position
): boolean => {
  const obstacleSpotIndex = layoutGrid.findIndex(
    (l) => l.row === position.row && l.col === position.col
  );

  // We wont add an obstacle if there is already an obstacle there.
  if (layoutGrid[obstacleSpotIndex].isObstacle) {
    return false;
  }
  // We wont add an obstacle if there is a guard there.
  if (layoutGrid[obstacleSpotIndex].isGuardAtPostion) {
    return false;
  }

  const localLayoutGrid = [...layoutGrid];

  localLayoutGrid[obstacleSpotIndex] = {
    row: position.row,
    col: position.col,
    isObstacle: true,
  };

  try {
    goForAWalk(localLayoutGrid);
  } catch (e) {
    if (e.message === "INFINITE_LOOP") {
      return true;
    }
  }

  return false;
};

export const findInfiniteLoops = (layoutGrid: Grid): number => {
  const results = layoutGrid.map((spot) => {
    return addObstacleAndAttemptWalk(layoutGrid, {
      row: spot.row,
      col: spot.col,
    });
  });

  return results.filter((r) => r).length;
};

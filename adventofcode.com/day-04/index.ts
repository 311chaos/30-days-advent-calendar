import { isOdd } from "../utils";

type Position = [number, number];
type SearchInput = {
  searchInput: string;
  searchString: string;
};

const DIRECTIONS: Record<string, Position> = {
  DIAG_UP_LEFT: [-1, -1],
  DIAG_DOWN_RIGHT: [1, 1],
  DIAG_UP_RIGHT: [-1, 1],
  DIAG_DOWN_LEFT: [1, -1],
  HORIZONTAL_LEFT: [0, -1],
  HORIZONTAL_RIGHT: [0, 1],
  VERTICAL_UP: [-1, 0],
  VERTICAL_DOWN: [1, 0],
};

export const stringMatchesDirection = ({
  searchString,
  directions,
  matrix,
  startingPosition,
}: {
  searchString: string;
  directions: Position;
  matrix: string[][];
  startingPosition: Position;
}) => {
  const [dirX, dirY] = directions;
  const [rowIndex, rowCharIndex] = startingPosition;

  if (rowIndex < 0 || rowCharIndex < 0) {
    return false;
  }

  if (rowIndex > matrix.length || rowCharIndex > matrix[0].length) {
    return false;
  }

  return searchString.split("").every((searchChar, searchCharIndex) => {
    const nextX = rowIndex + searchCharIndex * dirX;
    const nextY = rowCharIndex + searchCharIndex * dirY;

    return matrix[nextX] ? matrix[nextX][nextY] === searchChar : false;
  });
};

export const findStringInMatrix = ({
  searchInput,
  searchString,
}: SearchInput) => {
  const matrix = searchInput.split("\n").map((row) => row.split(""));
  const matches: { start: Position; direction: Position }[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((rowChar, rowCharIndex) => {
      Object.entries(DIRECTIONS).forEach(([_key, [dirX, dirY]]) => {
        const allCharsMatch = stringMatchesDirection({
          searchString,
          directions: [dirX, dirY],
          matrix,
          startingPosition: [rowIndex, rowCharIndex],
        });

        if (allCharsMatch) {
          matches.push({
            start: [rowIndex, rowCharIndex],
            direction: [dirX, dirY],
          });
        }
      });
    });
  });
  return matches;
};

export const findCrossInMatrix = ({
  searchInput,
  searchString,
}: SearchInput) => {
  if (!isOdd(searchString.length)) {
    throw new Error("Search string must be odd");
  }

  const matrix = searchInput.split("\n").map((row) => row.split(""));
  const matches: { start: Position }[] = [];
  const centerCharIndex = Math.floor(searchString.length / 2);
  const centerChar = searchString[centerCharIndex];

  matrix.forEach((row, rowIndex) => {
    row.forEach((rowChar, rowCharIndex) => {
      // Search for the center character, if not found return
      if (rowChar !== centerChar) {
        return;
      }

      const jumpLength = searchString.length - centerCharIndex - 1;

      // Search for \ diagonal
      const diagDown = [
        stringMatchesDirection({
          searchString,
          directions: DIRECTIONS.DIAG_DOWN_RIGHT,
          matrix,
          startingPosition: [rowIndex - jumpLength, rowCharIndex - jumpLength],
        }),
        stringMatchesDirection({
          searchString: searchString.split("").reverse().join(""),
          directions: DIRECTIONS.DIAG_DOWN_RIGHT,
          matrix,
          startingPosition: [rowIndex - jumpLength, rowCharIndex - jumpLength],
        }),
      ];

      // Search for / diagonal
      const diagUp = [
        stringMatchesDirection({
          searchString,
          directions: DIRECTIONS.DIAG_DOWN_LEFT,
          matrix,
          startingPosition: [rowIndex - jumpLength, rowCharIndex + jumpLength],
        }),
        stringMatchesDirection({
          searchString: searchString.split("").reverse().join(""),
          directions: DIRECTIONS.DIAG_DOWN_LEFT,
          matrix,
          startingPosition: [rowIndex - jumpLength, rowCharIndex + jumpLength],
        }),
      ];

      if (
        diagDown.some((result) => result) &&
        diagUp.some((result) => result)
      ) {
        matches.push({
          start: [rowIndex, rowCharIndex],
        });
      }
    });
  });

  return matches;
};

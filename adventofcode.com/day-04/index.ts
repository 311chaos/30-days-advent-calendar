import { readFile } from "fs/promises";

type Position = [number, number];

const directions = [
  [0, 1], // Horizontal right
  [1, 0], // Vertical down
  [0, -1], // Horizontal left
  [-1, 0], // Vertical up
  [1, 1], // Diagonal down-right
  [-1, -1], // Diagonal up-left
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
];

const crossDirections = [
  [1, 1], // Diagonal down-right
  [-1, -1], // Diagonal up-left
  [1, -1], // Diagonal down-left
  [-1, 1], // Diagonal up-right
];

export const getFile = async (fileName: string) => {
  return await readFile(`./adventofcode.com/day-04/${fileName}`, "utf-8");
};

export const findStringInMatrix = ({
  searchInput,
  searchString,
}: {
  searchInput: string;
  searchString: string;
}) => {
  const matrix = searchInput.split("\n").map((row) => row.split(""));
  const matches: { start: Position; direction: Position }[] = [];

  matrix.forEach((row, rowIndex) => {
    row.forEach((rowChar, rowCharIndex) => {
      directions.forEach(([dirX, dirY]) => {
        const allCharsMatch = searchString
          .split("")
          .every((searchChar, searchCharIndex) => {
            const nextX = rowIndex + searchCharIndex * dirX;
            const nextY = rowCharIndex + searchCharIndex * dirY;

            return matrix[nextX] ? matrix[nextX][nextY] === searchChar : false;
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

import { listOne, listTwo } from "./day-01-part-01.mjs";

// https://adventofcode.com/2024/day/1 - Part 2

const getSimilarityScore = () => {
  const similartityScore = listOne.reduce((acc, curr) => {
    const listTwoMatches = listTwo.filter((item) => item === curr);
    return acc + curr * listTwoMatches.length;
  }, 0);

  return similartityScore;
};

console.log(getSimilarityScore());

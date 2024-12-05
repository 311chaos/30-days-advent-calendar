// https://adventofcode.com/2024/day/1

type Lists = {
  listOne: number[];
  listTwo: number[];
};

const compareFn = (a: number, b: number) => a - b;

export const getSumDifferences = ({ listOne, listTwo }: Lists) => {
  const sortedListOne = listOne.sort(compareFn);
  const sortedListTwo = listTwo.sort(compareFn);

  const differences = sortedListOne.map((n, i) =>
    Math.abs(n - sortedListTwo[i])
  );

  const sumDifferences = differences.reduce((acc, n) => acc + n, 0);
  return sumDifferences;
};

export const getSimilarityScore = ({ listOne, listTwo }: Lists) => {
  const similartityScore = listOne.reduce((acc, curr) => {
    const listTwoMatches = listTwo.filter((item) => item === curr);
    return acc + curr * listTwoMatches.length;
  }, 0);

  return similartityScore;
};

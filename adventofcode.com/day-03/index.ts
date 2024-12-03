// // https://adventofcode.com/2024/day/3

import { readFile } from "fs/promises";

const regEx = /mul\([0-9]+,[0-9]+\)/gm;

export const getFile = async (fileName: string) => {
  return await readFile(`./adventofcode.com/day-03/${fileName}`, "utf-8");
};

export const parseInput = (input: string) => {
  return input.match(regEx);
};

export const parseInputAdvanced = (input: string) => {
  const newInput = input
    .split("do()")
    .map((i) => i.split("don't()")[0])
    .join(", ");

  return newInput.match(regEx);
};

export const processInput = (input?: string[] | null): number => {
  if (!input) {
    return 0;
  }

  return input.reduce((acc, item) => {
    const [a, b] = item
      .replace("mul(", "")
      .replace(")", "")
      .split(",")
      .map((value) => parseInt(value));

    return acc + a * b;
  }, 0);
};

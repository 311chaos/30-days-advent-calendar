import { readFile } from "fs/promises";

export const getFile = async (fileName: string) => {
  return await readFile(`./adventofcode.com/inputs/${fileName}`, "utf-8");
};

export const isOdd = (num: number): num is number => {
  return num % 2 !== 0;
};

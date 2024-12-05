import { readFile } from "fs/promises";

export const getFile = async (fileName: string) => {
  return await readFile(`./adventofcode.com/inputs/${fileName}`, "utf-8");
};

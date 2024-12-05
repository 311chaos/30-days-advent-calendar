export function createXmasTree(height: number, ornament: string): string {
  const maxLength = getNthOddNumber(height);
  const middle = (maxLength - 1) / 2;

  const trunk = `${"_".repeat(middle)}#${"_".repeat(middle)}`;

  const tree = Array.from({ length: height }, (_, i) => {
    return `${"_".repeat(height - i - 1)}${ornament.repeat(
      getNthOddNumber(i + 1)
    )}${"_".repeat(height - i - 1)}
`;
  })
    .join("")
    .trim();

  const builtTree = `${tree}
${trunk}
${trunk}`;

  return builtTree;
}

export const getNthOddNumber = (n: number): number => {
  return n * 2 - 1;
};

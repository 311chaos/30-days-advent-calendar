export function fixPackages(packages: string): string {
  let fixedPackages = packages;

  let innerParens = getInnerParens({
    searchString: fixedPackages,
    startingAt: 0,
  });

  while (innerParens.startingAt !== -1) {
    const updatedString = [
      fixedPackages.slice(0, innerParens.startingAt),
      fixedPackages
        .slice(
          innerParens.startingAt + 1,
          innerParens.startingAt + 1 + innerParens.searchString.length
        )
        .split("")
        .reverse()
        .join(""),
      fixedPackages.slice(
        innerParens.startingAt + 2 + innerParens.searchString.length
      ),
    ].join("");

    fixedPackages = updatedString;

    innerParens = getInnerParens({
      searchString: fixedPackages,
      startingAt: 0,
    });
  }

  return fixedPackages;
}

export const getInnerParens = ({
  searchString,
  startingAt,
}: {
  searchString: string;
  startingAt: number;
}) => {
  let openParenIndex = searchString.indexOf("(");
  let closeParenIndex = searchString.lastIndexOf(")");

  if (openParenIndex === -1 || closeParenIndex === -1) {
    return {
      searchString,
      startingAt: -1,
    };
  }

  const subString = searchString.slice(openParenIndex + 1, closeParenIndex);

  let innerOpen = subString.indexOf("(");
  let innerClose = subString.lastIndexOf(")");

  // If there are inner parens, loop again
  if (innerOpen !== -1 && innerClose !== -1) {
    return getInnerParens({
      searchString: subString,
      startingAt: startingAt + innerOpen + 1 + (openParenIndex - innerOpen),
    });
  }

  return {
    searchString: subString,
    startingAt: startingAt + openParenIndex,
  };
};

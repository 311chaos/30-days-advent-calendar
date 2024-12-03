function createFrame(names) {
  const longestName = names.reduce((longestName, name) => {
    if (name.length > longestName.length) {
      return name;
    }
    return longestName;
  }, "");

  const frameLength = longestName.length + 4;

  return [
    "*".repeat(frameLength),
    ...names.map(
      (name) => `* ${name}${" ".repeat(longestName.length - name.length)} *`
    ),
    "*".repeat(frameLength),
  ].join("\n");
}

console.log(createFrame(["Alice", "Bob", "Charlie", "David"]));

export function drawRace(indices: number[], length: number): string {
  return Array.from({ length: indices.length })
    .map((_, i) => {
      const row = Array.from({ length: length })
        .map((_, positionIndex) => {
          if (indices[i] > 0 && positionIndex === indices[i]) {
            return "r";
          }

          if (indices[i] < 0 && positionIndex === length + indices[i]) {
            return "r";
          }

          return "~";
        })
        .join("");

      return `${row.padStart(length + indices.length - i - 1, " ")} /${i + 1}`;
    })
    .join("\n");
}

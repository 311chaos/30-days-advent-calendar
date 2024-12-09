export const inBox = (box: string[]): boolean => {
  // Omit first and last rows
  const rows = box.slice(1, -1);

  // Check if there is a gift inside the bounds of the box
  return rows.some((row) => {
    const indexes = [...row.matchAll(/#/gi)].map((a) => a.index);
    const lastIndex = indexes.length - 1;
    const giftIndex = row.indexOf("*");

    return giftIndex > indexes[0] && giftIndex < indexes[lastIndex];
  });
};

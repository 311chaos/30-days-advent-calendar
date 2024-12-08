export type Shoe = {
  type: "I" | "R";
  size: number;
};

export const organizeShoes = (shoes: Shoe[]): number[] => {
  const leftShoes = shoes.filter((shoe) => shoe.type === "I");
  const rightShoes = shoes.filter((shoe) => shoe.type === "R");

  const pairedShoes: number[] = [];

  leftShoes.forEach((leftShoe) => {
    const rightShoeIndex = rightShoes.findIndex(
      (rightShoe) => rightShoe.size === leftShoe.size
    );
    if (rightShoeIndex !== -1) {
      pairedShoes.push(leftShoe.size);
      rightShoes.splice(rightShoeIndex, 1);
    }
  });

  return pairedShoes;
};

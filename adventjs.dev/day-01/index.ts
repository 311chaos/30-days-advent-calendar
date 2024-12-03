export const prepareGifts = (gifts: number[]): number[] => {
  const sortedGifts = gifts.sort((a, b) => a - b);
  const giftSet = new Set(sortedGifts);
  return Array.from(giftSet);
};

export const getStarColor = (ratingStars: number) => {
  if (ratingStars <= 3) return "#E90000";
  if (ratingStars <= 5) return "#E97E00";
  if (ratingStars <= 7) return "#E9D100";
  return "#66E900";
};

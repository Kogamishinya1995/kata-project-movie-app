export const formatTitle = (movieTitle: string, wordsPerLine: number) => {
  const screenWidth = window.innerWidth;

  const adjustedWordsPerLine =
    screenWidth <= 320 ? Math.max(1, wordsPerLine - 1) : wordsPerLine;

  const words = movieTitle.split(" ");
  return words.reduce((formattedTitle, word, index) => {
    const shouldAddLineBreak =
      (index + 1) % adjustedWordsPerLine === 0 && index !== words.length - 1;
    return formattedTitle + word + (shouldAddLineBreak ? " <br /> " : " ");
  }, "");
};

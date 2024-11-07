export default function shortenDescription(str: string): string {
  const isSmallScreen = window.innerWidth <= 480;
  const maxWords = isSmallScreen ? 35 * 0.7 : 35;

  return str.length > 50
    ? `${str
        .split(" ")
        .filter((_, index) => index <= maxWords)
        .join(" ")}...`
    : str;
}

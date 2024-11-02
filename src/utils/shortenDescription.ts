export default function shortenDescription(str: string): string {
  return str.length > 50
    ? `${str
        .split(" ")
        .filter((_, index) => index <= 35)
        .join(" ")}...`
    : str;
}

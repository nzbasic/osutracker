export const preventOverflow = (string, number) =>
  string.length > number ? string.slice(0, number) + "..." : string;

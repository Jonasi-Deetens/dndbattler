export const ets = <T>(enumValue: T): string => {
  return String(enumValue)
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
};

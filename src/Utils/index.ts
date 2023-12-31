export const capitalizeWords = (words: string) => {
  return words
    .split(" ")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const formatCurrency = (amount: number) => {
  const locales = navigator.languages as string | string[] | undefined;
  return new Intl.NumberFormat(locales, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const limitChars = (text: string, limit: number) => {
  return `${text.slice(0, limit - 3)}${limit - 3 < 10 ? "..." : ""}`;
};

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
  }).format(amount);
};

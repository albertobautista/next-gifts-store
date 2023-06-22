export const formatCurrency = (amount: number): string => {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formattedAmount;
};

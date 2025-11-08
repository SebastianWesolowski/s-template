export const formatPrice = (price: number): string => {
  const formatted = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    currencyDisplay: 'symbol',
  }).format(price);

  return formatted.replace('PLN', 'zł').trim();
};

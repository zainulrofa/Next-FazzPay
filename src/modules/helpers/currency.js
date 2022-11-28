export const currency = (price) => {
  return parseFloat(price)
    .toFixed()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

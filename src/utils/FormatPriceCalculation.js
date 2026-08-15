export const FormatPriceCalculation = (quantity, price) => {
    return (Number(quantity) * Number(price)).toFixed(2);
};
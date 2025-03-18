function currencyConverter(productInCurrency) {
  const priceInInteger = Math.round(Number(productInCurrency.price) * 100);
  const { price, ...rest } = productInCurrency;
  const productInInteger = { ...rest, priceInInteger };

  return productInInteger;
}

function integerConverter(productInInteger) {
  const price = Number(productInInteger.priceInInteger) / 100;

  const { priceInInteger, ...rest } = productInInteger;
  const productInCurrency = { ...rest, price };

  return productInCurrency;
}

export { currencyConverter, integerConverter };

import productRepositories from "../Repositories/productRepositories.js";
import { currencyConverter, integerConverter } from "./converterServices.js";

async function createProductService(newProduct, userId) {
  const newProductInInteger = currencyConverter(newProduct);

  const createdProduct = await productRepositories.createProductRepository(
    newProductInInteger,
    userId
  );
  if (!createdProduct) throw new Error("Product not created.");

  const newProductInCurrency = integerConverter(createdProduct);

  return newProductInCurrency;
}

export default { createProductService };

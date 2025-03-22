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

async function updateProductService(productId, updatedProduct, userId) {
  const productExists = await productRepositories.findProductByIdRepository(
    productId
  );
  if (!productExists) throw new Error("Product not found.");

  if (userId !== productExists.userId) throw new Error("Unauthorized.");

  const updatedProductInInteger = currencyConverter(updatedProduct);
  const productWasUpdated = await productRepositories.updateProductRepository(
    productId,
    updatedProductInInteger
  );
  if (!productWasUpdated) throw new Error("Product not updated.");

  const updatedProductInCurrency = integerConverter(productWasUpdated);

  return updatedProductInCurrency;
}

async function deleteProductService(productId, userId) {
  const productExists = await productRepositories.findProductByIdRepository(
    productId
  );
  if (!productExists) throw new Error("Product not found.");

  if (userId !== productExists.userId) throw new Error("Unauthorized.");

  const deletedProduct = await productRepositories.deleteProductRepository(
    productId
  );
  if (!deletedProduct) throw new Error("Product not deleted.");

  return deletedProduct;
}

async function findAllProductsService() {
  const products = await productRepositories.findAllProductsRepository();
  if (!products) throw new Error("Products not found.");

  const productsInCurrency = products.map((product) => {
    return integerConverter(product);
  });

  return productsInCurrency;
}

async function findProductsByCategoryService(category) {
  const products = await productRepositories.findProductsByCategoryRepository(
    category
  );

  // Para não passar undefined para o conversor.
  if (!products) {
    return [];
  }

  // Garante que estamos lidando com um array
  const normalizedProducts = Array.isArray(products) ? products : [products];

  return normalizedProducts.map(integerConverter);
}

async function findProductsByNameService(productName) {
  const products = await productRepositories.findProductsByNameRepository(
    productName
  );

  if (!products) {
    return [];
  }

  const normalizedProducts = Array.isArray(products) ? products : [products];

  return normalizedProducts.map(integerConverter);
}

export default {
  createProductService,
  updateProductService,
  deleteProductService,
  findAllProductsService,
  findProductsByCategoryService,
  findProductsByNameService,
};

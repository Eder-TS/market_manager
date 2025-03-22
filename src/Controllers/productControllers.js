import productServices from "../Services/productServices.js";

async function createProductController(request, response) {
  const userId = request.userId;
  const newProduct = request.body;

  try {
    const createdProduct = await productServices.createProductService(
      newProduct,
      userId
    );
    response.status(201).send(createdProduct);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

async function updateProductController(request, response) {
  const userId = request.userId;
  const productId = request.params.id;
  const updatedProduct = request.body;

  try {
    const productWasUpdated = await productServices.updateProductService(
      productId,
      updatedProduct,
      userId
    );
    response.send(productWasUpdated);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

async function deleteProductController(request, response) {
  const userId = request.userId;
  const productId = request.params.id;

  try {
    const deletedProduct = await productServices.deleteProductService(
      productId,
      userId
    );
    response.send(deletedProduct);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

async function findAllProductsController(request, response) {
  try {
    const products = await productServices.findAllProductsService();
    response.send({ products });
  } catch (err) {
    response.status(404).send(err.message);
  }
}

async function findProductsByCategoryController(request, response) {
  const category = request.params.category;

  try {
    const products = await productServices.findProductsByCategoryService(
      category
    );
    response.send({ products });
  } catch (err) {
    response.status(404).send(err.message);
  }
}

async function findProductsByNameController(request, response) {
  const productName = request.query.name;

  try {
    const products = await productServices.findProductsByNameService(
      productName
    );
    response.send({ products });
  } catch (err) {
    response.status(404).send(err.message);
  }
}

export default {
  createProductController,
  updateProductController,
  deleteProductController,
  findAllProductsController,
  findProductsByCategoryController,
  findProductsByNameController,
};

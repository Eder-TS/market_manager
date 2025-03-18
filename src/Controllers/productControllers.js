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

export default { createProductController };

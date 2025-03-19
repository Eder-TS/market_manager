import { productIdSchema } from "../Schemas/productSchemas.js";

const validate = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

const validateProductId = (request, response, next) => {
  try {
    const productId = +request.params.id;
    productIdSchema.parse({ id: productId });
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

export { validate, validateProductId };

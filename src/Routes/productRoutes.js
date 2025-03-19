import { Router } from "express";
import {
  validate,
  validateProductId,
} from "../Middlewares/validationMiddleware.js";
import { productSchema } from "../Schemas/productSchemas.js";
import productControllers from "../Controllers/productControllers.js";

const router = Router();

router.post(
  "/products",
  validate(productSchema),
  productControllers.createProductController
);

router.put(
  "/products/:id",
  validateProductId,
  productControllers.updateProductController
);

router.delete(
  "/products/:id",
  validateProductId,
  productControllers.deleteProductController
);

router.get("/products", productControllers.findAllProductsController);

export default router;

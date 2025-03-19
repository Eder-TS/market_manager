import { Router } from "express";
import productControllers from "../Controllers/productControllers.js";

const router = Router();

router.post("/products", productControllers.createProductController);

router.put("/products/:id", productControllers.updateProductController);

router.delete("/products/:id", productControllers.deleteProductController);

router.get("/products", productControllers.findAllProductsController);

export default router;

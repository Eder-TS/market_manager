import { Router } from "express";
import productControllers from "../Controllers/productControllers.js";

const router = Router();

router.post("/products", productControllers.createProductController);

export default router;

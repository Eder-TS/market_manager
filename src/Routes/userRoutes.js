import { Router } from "express";
import userControllers from "../Controllers/userControllers.js";

const router = Router();

router.post("/users", userControllers.createUserController);
router.patch("/users/:id", userControllers.updateUserPasswordController);
router.delete("/users/:id", userControllers.deleteUserController);

export default router;

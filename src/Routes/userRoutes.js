import { Router } from "express";
import userControllers from "../Controllers/userControllers.js";
import { validate } from "../Middlewares/validationMiddleware.js";
import { userSchema } from "../Schemas/userSchemas.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userControllers.createUserController
);

router.post("/users/login", userControllers.loginUserController);

router.use(authMiddleware);

router.patch("/users", userControllers.updateUserPasswordController);

router.delete("/users", userControllers.deleteUserController);

export default router;

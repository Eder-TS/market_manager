import { Router } from "express";
import userControllers from "../Controllers/userControllers.js";
import {
  validate,
  validateUserId,
} from "../Middlewares/validationMiddleware.js";
import { userSchema } from "../Schemas/userSchema.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/users",
  validate(userSchema),
  userControllers.createUserController
);

router.use(authMiddleware);

router.patch("/users", userControllers.updateUserPasswordController);

router.delete("/users", userControllers.deleteUserController);

export default router;

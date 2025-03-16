import userRepositories from "../Repositories/usersRepositories.js";
import bcrypt from "bcrypt";
import { generateJWT } from "./authServices.js";

async function createUserService(newUser) {
  const { email, password } = newUser;
  const userExists = await userRepositories.findUserByEmailRepository(email);
  if (userExists) throw new Error("User already exists.");

  const encryptedPassword = await bcrypt.hash(password, 10);

  const createdUser = await userRepositories.createUserRepository({
    ...newUser,
    password: encryptedPassword,
  });
  if (!createdUser) throw new Error("Error to create user.");

  const token = generateJWT(createdUser.id);

  return token;
}

async function findUserByIdService(userId) {
  const user = await userRepositories.findUserByIdRepository(userId);
  if (!user) throw new Error("User not found.");
  return user;
}

async function updateUserPasswordService(userId, newPassword) {
  const userExists = await userRepositories.findUserByIdRepository(userId);
  if (!userExists) throw new Error("User not found.");

  const updated = await userRepositories.updateUserPasswordRepository(
    userId,
    newPassword
  );
  if (!updated) throw new Error("Error to update password.");

  return updated;
}

async function deleteUserService(userId) {
  const userExists = await userRepositories.findUserByIdRepository(userId);
  if (!userExists) throw new Error("User not found.");

  const deleted = await userRepositories.deleteUserRepository(userId);
  if (!deleted) throw new Error("Error to delete user.");

  return deleted;
}

export default {
  createUserService,
  findUserByIdService,
  updateUserPasswordService,
  deleteUserService,
};

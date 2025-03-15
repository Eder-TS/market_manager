import userRepositories from "../Repositories/usersRepositories.js";

async function createUserService(newUser) {
  const { email, password } = newUser;
  const userExists = await userRepositories.findUserByEmailRepository(email);
  if (userExists) throw new Error("User already exists.");

  const createdUser = await userRepositories.createUserRepository(newUser);
  if (!createdUser) throw new Error("Error to create user.");

  return createdUser;
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
  updateUserPasswordService,
  deleteUserService,
};

import "dotenv/config.js";
import jwt from "jsonwebtoken";
import usersRepositories from "../Repositories/usersRepositories.js";
import bcrypt from "bcrypt";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 604800 });
}

async function loginService(email, password) {
  const user = await usersRepositories.findUserByEmailRepository(email);
  if (!user) throw new Error("Invalid user.");

  const encryptedPassword = await bcrypt.hash(password, 10);
  const isPasswordValid = bcrypt.compare(encryptedPassword, user.password);
  if (!isPasswordValid) throw new Error("Invalid user.");

  return generateJWT(user.id);
}

export { generateJWT, loginService };

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

  const isPasswordvalid = bcrypt.compare(password, user.password);
  if (!isPasswordvalid) throw new Error("Invalid user.");

  return generateJWT(user.id);
}

export { generateJWT, loginService };

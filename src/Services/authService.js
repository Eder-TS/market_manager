import "dotenv/config.js";
import jwt from "jsonwebtoken";

function generateJWT(id) {
  return jwt.sign({ id }, process.env.SECRET_JWT, { expiresIn: 604800 });
}

export { generateJWT };

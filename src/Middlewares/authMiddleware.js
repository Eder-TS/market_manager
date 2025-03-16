import jwt from "jsonwebtoken";
import "dotenv/config.js";
import userServices from "../Services/userServices.js";

export function authMiddleware(request, response, next) {
  const tokenHeader = request.headers.authorization;
  if (!tokenHeader) {
    return response.status(401).send({ message: "Token was not informed." });
  }

  const partsToken = tokenHeader.split(" ");
  if (partsToken.length !== 2) {
    return response.status(401).send({ message: "Invalid token." });
  }

  const [schema, tokenJWT] = partsToken;
  if (!/^Bearer$/i.test(schema)) {
    return response.status(401).send({ message: "Malformatted token." });
  }

  jwt.verify(tokenJWT, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) {
      return response.status(401).send({ message: "Invalid token." });
    }

    const user = await userServices.findUserByIdService(decoded.id);

    if (!user || !user.id) {
      return response.status(401).send({ message: "Invalid token." });
    }

    request.userId = user.id;

    return next();
  });
}

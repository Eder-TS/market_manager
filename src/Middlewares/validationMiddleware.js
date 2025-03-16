import { userIdSchema } from "../Schemas/userSchema.js";

const validate = (schema) => (request, response, next) => {
  try {
    schema.parse(request.body);
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

const validateUserId = (request, response, next) => {
  try {
    const userId = +request.params.id;
    userIdSchema.parse({ id: userId });
    next();
  } catch (err) {
    response.status(400).json({ error: err.errors });
  }
};

export { validate, validateUserId };

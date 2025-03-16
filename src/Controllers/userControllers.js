import userServices from "../Services/userServices.js";

async function createUserController(request, response) {
  const newUser = request.body;

  try {
    const token = await userServices.createUserService(newUser);
    response.status(201).send(token);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

async function updateUserPasswordController(request, response) {
  const userId = request.userId;
  const newPassword = request.body.newPassword;

  try {
    const updated = await userServices.updateUserPasswordService(
      userId,
      newPassword
    );
    response.send(updated);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

async function deleteUserController(request, response) {
  const userId = request.userId;

  try {
    const deleted = await userServices.deleteUserService(userId);
    response.send(deleted);
  } catch (err) {
    response.status(400).send(err.message);
  }
}

export default {
  createUserController,
  updateUserPasswordController,
  deleteUserController,
};

import db from "../Configs/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

function createUserRepository(newUser) {
  const { email, password } = newUser;
  return new Promise((resolve, reject) => {
    db.run(
      `
            INSERT INTO users (email, password)
            VALUES (?, ?)
        `,
      [email, password],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}

function findUserByEmailRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `
            SELECT *
            FROM users
            WHERE email = ?
        `,
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function findUserByIdRepository(userId) {
  return new Promise((resolve, reject) => {
    db.get(
      `
            SELECT id, email
            FROM users
            WHERE id = ?
        `,
      [userId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function updateUserPasswordRepository(userId, newPassword) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE users
      SET password = ?
      WHERE id = ?
    `,
      [newPassword, userId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Password updated successfully." });
        }
      }
    );
  });
}

function deleteUserRepository(userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `
      DELETE FROM users
      WHERE id = ?
    `,
      [userId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "User deleted successfully." });
        }
      }
    );
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  updateUserPasswordRepository,
  deleteUserRepository,
};

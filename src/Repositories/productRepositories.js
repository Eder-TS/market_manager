import db from "../Configs/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        priceInInteger INTEGER NOT NULL,
        category TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
`);

function createProductRepository(newProduct, userId) {
  const { name, description, priceInInteger, category } = newProduct;

  return new Promise((resolve, reject) => {
    db.run(
      `
            INSERT INTO  products
            (name, description, priceInInteger, category, userId)
            VALUES (?, ?, ?, ?, ?)
            `,
      [name, description, priceInInteger, category, userId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newProduct });
        }
      }
    );
  });
}

export default { createProductRepository };

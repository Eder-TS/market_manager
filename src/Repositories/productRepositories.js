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

function findProductByIdRepository(productId) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT *
      FROM products
      WHERE id = ?
    `,
      [productId],
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

function updateProductRepository(productId, updatedProduct) {
  const { name, description, priceInInteger, category } = updatedProduct;
  return new Promise((resolve, reject) => {
    db.run(
      `
      UPDATE products 
      SET name = ?, description = ?, priceInInteger = ?, category = ?
      WHERE id = ?
      `,
      [name, description, priceInInteger, category, productId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: productId, ...updatedProduct });
        }
      }
    );
  });
}

function deleteProductRepository(productId) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE
        FROM products
        WHERE id = ?
      `,
      [productId],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Product deleted successfully.", productId });
        }
      }
    );
  });
}

function findAllProductsRepository() {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT name, description, priceInInteger, category
        FROM products
      `,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export default {
  createProductRepository,
  findProductByIdRepository,
  updateProductRepository,
  deleteProductRepository,
  findAllProductsRepository,
};

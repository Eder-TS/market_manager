import sqlite3 from "sqlite3";

const db = new sqlite3.Database("market_db.sqlite", (err) => {
  if (err) {
    console.log("Error to conect to database.", err.message);
  } else {
    console.log("Conected to SQLite database.");
  }
});

export default db;

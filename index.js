import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
console.log("Nothing here!");
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

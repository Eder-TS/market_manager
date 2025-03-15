import express from "express";
import "dotenv/config";
import userRoutes from "./src/Routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

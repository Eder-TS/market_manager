import express from "express";
import "dotenv/config";
import userRoutes from "./src/Routes/userRoutes.js";

const app = express();

app.use(express.json());

// Sugestão do ChatGPT para lidar com SyntaxError
// que possa vir do express.json().
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res
      .status(400)
      .json({ error: "JSON malformado no corpo da requisição." });
  }
  next(err);
});
app.use((err, req, res, next) => {
  console.error("Erro não tratado:", err);
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.use(userRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: `Rota ${req.method} ${req.originalUrl} não encontrada.`,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

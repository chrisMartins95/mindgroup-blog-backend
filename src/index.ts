import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";
import { authRoutes } from "./routes/auth.routes";
import { articleRoutes } from "./routes/article.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.use("/api/auth", authRoutes);

app.use("/api/articles", articleRoutes);
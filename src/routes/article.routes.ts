import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware"; // ⬅️ Importa o multer

import {
  createArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller";

export const articleRoutes = Router();

// ✅ Rotas com upload (usar o middleware do multer)
articleRoutes.post("/", authenticateToken, upload.single("imagem"), createArticleController);
articleRoutes.put("/:id", authenticateToken, upload.single("imagem"), updateArticleController);

// 🔒 Protegida, sem upload
articleRoutes.delete("/:id", authenticateToken, deleteArticleController);

// 🌐 Públicas
articleRoutes.get("/", getAllArticlesController);
articleRoutes.get("/:id", getArticleByIdController);

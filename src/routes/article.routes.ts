import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware"; // ⬅️ multer

import {
  createArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  getMyArticlesController, // ✅ ADICIONADO AQUI
} from "../controllers/article.controller";

export const articleRoutes = Router();

// ✅ Rotas com upload (usar o middleware do multer)
articleRoutes.post("/", authenticateToken, upload.single("imagem"), createArticleController);
articleRoutes.put("/:id", authenticateToken, upload.single("imagem"), updateArticleController);

// 🔒 Protegidas
articleRoutes.delete("/:id", authenticateToken, deleteArticleController);
articleRoutes.get("/meus", authenticateToken, getMyArticlesController); // ✅ NOVA ROTA

// 🌐 Públicas
articleRoutes.get("/", getAllArticlesController);
articleRoutes.get("/:id", getArticleByIdController);

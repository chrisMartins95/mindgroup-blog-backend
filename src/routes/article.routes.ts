import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";

import {
  createArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
} from "../controllers/article.controller";

export const articleRoutes = Router();

// Todas rotas exceto GET / são protegidas
articleRoutes.post("/", authenticateToken, createArticleController);
articleRoutes.put("/:id", authenticateToken, updateArticleController);
articleRoutes.delete("/:id", authenticateToken, deleteArticleController);

// Rotas públicas para listar artigos e detalhes
articleRoutes.get("/", getAllArticlesController);
articleRoutes.get("/:id", getArticleByIdController);

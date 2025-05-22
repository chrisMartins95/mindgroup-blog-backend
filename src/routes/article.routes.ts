import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware"; // Middleware para autenticação JWT
import { upload } from "../middlewares/upload.middleware"; // Middleware para upload de imagens (multer)

import {
  createArticleController,
  getAllArticlesController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  getMyArticlesController, // Controlador para buscar artigos do usuário logado
} from "../controllers/article.controller";

// Cria um roteador do Express para os artigos
export const articleRoutes = Router();

// Rotas que exigem upload de imagem (usam o middleware do multer)
// POST / - Cria um novo artigo (autenticado e com upload de imagem)
articleRoutes.post("/", authenticateToken, upload.single("imagem"), createArticleController);
// PUT /:id - Atualiza um artigo existente (autenticado e com upload de imagem)
articleRoutes.put("/:id", authenticateToken, upload.single("imagem"), updateArticleController);

// Rotas protegidas (só acessa se estiver autenticado)
// DELETE /:id - Deleta um artigo pelo ID
articleRoutes.delete("/:id", authenticateToken, deleteArticleController);
// GET /meus - Busca artigos do usuário autenticado
articleRoutes.get("/meus", authenticateToken, getMyArticlesController);

// Rotas públicas (qualquer usuário pode acessar)
// GET / - Lista todos os artigos
articleRoutes.get("/", getAllArticlesController);
// GET /:id - Busca um artigo pelo ID
articleRoutes.get("/:id", getArticleByIdController);

// Rotas relacionadas ao usuário (exemplo de rota de teste)

import { Router } from "express";

// Cria um roteador do Express para usuários
export const userRoutes = Router();

// Rota de teste para verificar se as rotas de usuário estão funcionando
// GET /test
userRoutes.get("/test", (req, res) => {
  res.json({ message: "Rota de usuários funcionando!" });
});

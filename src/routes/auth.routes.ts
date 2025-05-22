import { Router } from "express";
import { login, register } from "../controllers/auth.controller"; // Importa os controladores de autenticação
import { authenticateToken } from "../middlewares/auth.middleware"; // Middleware para proteger rotas

// Cria um roteador do Express para autenticação
export const authRoutes = Router();

// Rota para registrar um novo usuário (POST /register)
authRoutes.post("/register", register);

// Rota para login do usuário (POST /login)
authRoutes.post("/login", login);

// Rota protegida de exemplo (GET /protected)
// Só acessa se estiver autenticado (token válido)
authRoutes.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acesso liberado!", user: (req as any).user });
});

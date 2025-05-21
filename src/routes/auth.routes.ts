import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

export const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

authRoutes.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acesso liberado!", user: (req as any).user });
});

import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/test", (req, res) => {
  res.json({ message: "Rota de usuários funcionando!" });
});

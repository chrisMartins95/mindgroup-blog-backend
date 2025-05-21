import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  const { nome, email, senha } = req.body;
  try {
    await registerService({ nome, email, senha });
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;
  try {
    const data = await loginService(email, senha);
    res.json(data);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

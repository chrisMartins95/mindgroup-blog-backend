import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";

// Controller responsável pelo registro de novos usuários
export async function register(req: Request, res: Response) {
  // Extrai nome, email e senha do corpo da requisição
  const { nome, email, senha } = req.body;
  try {
    // Chama o serviço de registro para criar o usuário
    await registerService({ nome, email, senha });
    // Retorna sucesso se o usuário for criado
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err: any) {
    // Retorna erro caso algo dê errado (ex: email já cadastrado)
    res.status(400).json({ error: err.message });
  }
}

// Controller responsável pelo login de usuários
export async function login(req: Request, res: Response) {
  // Extrai email e senha do corpo da requisição
  const { email, senha } = req.body;
  try {
    // Chama o serviço de login para autenticar o usuário
    const data = await loginService(email, senha);
    // Retorna os dados de autenticação (ex: token JWT)
    res.json(data);
  } catch (err: any) {
    // Retorna erro caso as credenciais estejam incorretas
    res.status(401).json({ error: err.message });
  }
}

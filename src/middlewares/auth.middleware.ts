import { Request, Response, NextFunction } from "express"; // Importa os tipos do Express para tipagem das funções
import jwt from "jsonwebtoken"; // Importa a biblioteca JWT, usada para criar e validar tokens de autenticação

const JWT_SECRET = process.env.JWT_SECRET as string; // Chave secreta usada para assinar e validar tokens JWT, definida nas variáveis de ambiente

// Interface que define o formato esperado do payload dentro do token JWT
interface JwtPayload {
  id: number;    // ID do usuário autenticado
  email: string; // Email do usuário autenticado
}

// Middleware responsável por autenticar requisições usando JWT
export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // O token JWT geralmente é enviado no header Authorization no formato: "Bearer TOKEN"
  const authHeader = req.headers["authorization"]; // Recupera o header Authorization da requisição
  const token = authHeader && authHeader.split(" ")[1]; // Se existir, separa e pega apenas o token

  if (!token) {
    // Caso não exista token, retorna erro 401 (não autorizado)
    res.status(401).json({ error: "Token não fornecido" });
    return; // Interrompe o fluxo da requisição
  }

  try {
    // jwt.verify valida o token usando a chave secreta.
    // Se o token for válido, retorna o payload (dados do usuário).
    // Se for inválido ou expirado, lança um erro.
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Adiciona os dados do usuário (payload) ao objeto da requisição,
    // permitindo que outras partes do sistema acessem as informações do usuário autenticado
    (req as any).user = payload;

    // Chama o próximo middleware ou rota, pois a autenticação foi bem-sucedida
    next();
  } catch (err) {
    // Se o token for inválido ou expirado, retorna erro 403 (proibido)
    res.status(403).json({ error: "Token inválido" });
    return;
  }
}

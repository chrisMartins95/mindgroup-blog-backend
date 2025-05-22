import bcrypt from "bcrypt"; // Biblioteca para hash e comparação de senhas
import jwt from "jsonwebtoken"; // Biblioteca para geração de tokens JWT
import { User, createUser, findUserByEmail } from "../models/user.model"; // Importa funções e tipos do modelo de usuário

const JWT_SECRET = process.env.JWT_SECRET as string; // Chave secreta para assinar o token JWT

// Função responsável pelo registro de novos usuários
export async function registerService(user: User) {
  // Verifica se já existe um usuário com o e-mail informado
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) throw new Error("E-mail já cadastrado");

  // Gera o hash da senha antes de salvar no banco
  const hashedPassword = await bcrypt.hash(user.senha, 10);
  // Cria o usuário com a senha criptografada
  await createUser({ ...user, senha: hashedPassword });
}

// Função responsável pelo login do usuário
export async function loginService(email: string, senha: string) {
  // Busca o usuário pelo e-mail
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");

  // Compara a senha informada com o hash salvo no banco
  const match = await bcrypt.compare(senha, user.senha);
  if (!match) throw new Error("Senha incorreta");

  // Gera um token JWT válido por 1 hora
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  // Retorna o token e os dados do usuário (exceto a senha)
  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
}

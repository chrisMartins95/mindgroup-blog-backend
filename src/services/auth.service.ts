import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, createUser, findUserByEmail } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function registerService(user: User) {
  const existingUser = await findUserByEmail(user.email);
  if (existingUser) throw new Error("E-mail já cadastrado");

  const hashedPassword = await bcrypt.hash(user.senha, 10);
  await createUser({ ...user, senha: hashedPassword });
}

export async function loginService(email: string, senha: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Usuário não encontrado");

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) throw new Error("Senha incorreta");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  return {
    token,
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email,
    },
  };
}

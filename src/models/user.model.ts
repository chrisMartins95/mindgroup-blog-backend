import { connection } from "../database/connection";

// Interface com os nomes do banco
export interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

export async function createUser(user: User): Promise<void> {
  const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
  await connection.query(sql, [user.nome, user.email, user.senha]);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  const users = rows as User[];
  return users.length > 0 ? users[0] : null;
}

import { connection } from "../database/connection"; // Importa a conexão com o banco de dados

// Interface que representa um usuário
export interface User {
  id?: number;      // ID do usuário (opcional, gerado pelo banco)
  nome: string;     // Nome do usuário
  email: string;    // Email do usuário
  senha: string;    // Senha do usuário (armazenada de forma segura)
}

// Função para criar um novo usuário no banco de dados
export async function createUser(user: User): Promise<void> {
  const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
  await connection.query(sql, [user.nome, user.email, user.senha]);
}

// Função para buscar um usuário pelo email (usada para login/autenticação)
export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  const users = rows as User[];
  return users.length > 0 ? users[0] : null; // Retorna o usuário encontrado ou null
}

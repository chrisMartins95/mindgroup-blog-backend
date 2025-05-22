import mysql from "mysql2/promise"; // Importa o pacote mysql2 com suporte a Promises
import dotenv from "dotenv";         // Importa o dotenv para gerenciar variáveis de ambiente

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Cria um pool de conexões com o banco de dados MySQL usando as variáveis de ambiente
export const connection = mysql.createPool({
  host: process.env.DB_HOST,       // Endereço do banco de dados
  user: process.env.DB_USER,       // Usuário do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  database: process.env.DB_NAME,   // Nome do banco de dados
});

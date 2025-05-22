import express from "express"; // Framework para criar o servidor HTTP
import cors from "cors"; // Middleware para habilitar o CORS (Cross-Origin Resource Sharing)
import dotenv from "dotenv"; // Carrega variáveis de ambiente do arquivo .env
import path from "path"; // Módulo para manipulação de caminhos de arquivos
import { userRoutes } from "./routes/user.routes"; // Rotas relacionadas a usuários
import { authRoutes } from "./routes/auth.routes"; // Rotas relacionadas à autenticação
import { articleRoutes } from "./routes/article.routes"; // Rotas relacionadas a artigos

dotenv.config(); // Inicializa as variáveis de ambiente

const app = express(); // Cria a aplicação Express
app.use(cors()); // Permite requisições de diferentes origens
app.use(express.json()); // Permite receber e enviar JSON nas requisições

// Definição das rotas principais da API
app.use("/api/users", userRoutes); // Rotas de usuário
app.use("/api/auth", authRoutes); // Rotas de autenticação
app.use("/api/articles", articleRoutes); // Rotas de artigos

// Rota para servir arquivos estáticos (uploads de imagens, por exemplo)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Inicializa o servidor na porta definida no .env ou 3000 por padrão
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

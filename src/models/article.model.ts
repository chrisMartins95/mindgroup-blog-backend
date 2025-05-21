import { connection } from "../database/connection";

export interface Article {
  id?: number;
  titulo: string;
  conteudo: string;
  autor_id: number;   // FK para usuário
  data_publicacao?: Date;
  data_alteracao?: Date;
  imagem?: Buffer | null; // Para imagem (opcional)
}

// Criar artigo
export async function createArticle(article: Article): Promise<void> {
  const sql = `
    INSERT INTO articles (titulo, conteudo, autor_id, data_publicacao, data_alteracao)
    VALUES (?, ?, ?, NOW(), NOW())
  `;
  await connection.query(sql, [article.titulo, article.conteudo, article.autor_id]);
}

// Listar artigos
export async function getAllArticles(): Promise<Article[]> {
  const [rows] = await connection.query("SELECT * FROM articles ORDER BY data_publicacao DESC");
  return rows as Article[];
}

// Buscar artigo por ID
export async function getArticleById(id: number): Promise<Article | null> {
  const [rows] = await connection.query("SELECT * FROM articles WHERE id = ?", [id]);
  const articles = rows as Article[];
  return articles.length > 0 ? articles[0] : null;
}

// Atualizar artigo
export async function updateArticle(article: Article): Promise<void> {
  const sql = `
    UPDATE articles 
    SET titulo = ?, conteudo = ?, data_alteracao = NOW() 
    WHERE id = ? AND autor_id = ?
  `;
  await connection.query(sql, [article.titulo, article.conteudo, article.id, article.autor_id]);
}

// Deletar artigo
export async function deleteArticle(id: number, autor_id: number): Promise<void> {
  const sql = `DELETE FROM articles WHERE id = ? AND autor_id = ?`;
  await connection.query(sql, [id, autor_id]);
}

import { connection } from "../database/connection";

export interface Article {
  id?: number;
  titulo: string;
  conteudo: string;
  autor_id: number;
  data_publicacao?: Date;
  data_alteracao?: Date;
  imagem?: string | null;
  nome?: string; // nome do autor (opcional)
}

// Criar artigo
export async function createArticle(article: Article): Promise<void> {
  const sql = `
    INSERT INTO articles (titulo, conteudo, autor_id, imagem, data_publicacao, data_alteracao)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  await connection.query(sql, [
    article.titulo,
    article.conteudo,
    article.autor_id,
    article.imagem ?? null,
  ]);
}

// Listar todos os artigos (com nome do autor)
export async function getAllArticles(): Promise<Article[]> {
  const sql = `
    SELECT 
      a.id, a.titulo, a.conteudo, a.autor_id, a.data_publicacao, a.data_alteracao, a.imagem,
      u.nome AS nome
    FROM articles a
    JOIN users u ON a.autor_id = u.id
    ORDER BY a.data_publicacao DESC
  `;
  const [rows] = await connection.query(sql);
  return rows as Article[];
}

// 🔍 Buscar artigo por ID (com nome do autor)
export async function getArticleById(id: number): Promise<Article | null> {
  const sql = `
    SELECT 
      a.id, a.titulo, a.conteudo, a.autor_id, a.data_publicacao, a.data_alteracao, a.imagem,
      u.nome AS nome
    FROM articles a
    JOIN users u ON a.autor_id = u.id
    WHERE a.id = ?
  `;
  const [rows] = await connection.query(sql, [id]);
  const articles = rows as Article[];
  return articles.length > 0 ? articles[0] : null;
}

// ✏️ Atualizar artigo
export async function updateArticle(article: Article): Promise<void> {
  const sql = `
    UPDATE articles 
    SET titulo = ?, conteudo = ?, imagem = ?, data_alteracao = NOW() 
    WHERE id = ? AND autor_id = ?
  `;
  await connection.query(sql, [
    article.titulo,
    article.conteudo,
    article.imagem ?? null,
    article.id,
    article.autor_id,
  ]);
}

// 🗑️ Deletar artigo
export async function deleteArticle(id: number, autor_id: number): Promise<void> {
  const sql = `DELETE FROM articles WHERE id = ? AND autor_id = ?`;
  await connection.query(sql, [id, autor_id]);
}

// ✅ 🔐 NOVA FUNÇÃO: Listar artigos do usuário logado
export async function getArticlesByUserId(userId: number): Promise<Article[]> {
  const sql = `
    SELECT 
      a.id, a.titulo, a.conteudo, a.autor_id, a.data_publicacao, a.data_alteracao, a.imagem,
      u.nome AS nome
    FROM articles a
    JOIN users u ON a.autor_id = u.id
    WHERE a.autor_id = ?
    ORDER BY a.data_publicacao DESC
  `;
  const [rows] = await connection.query(sql, [userId]);
  return rows as Article[];
}

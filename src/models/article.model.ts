import { connection } from "../database/connection"; // Importa a conexão com o banco de dados

// Interface que representa um artigo
export interface Article {
  id?: number; // ID do artigo (opcional, pois é gerado pelo banco)
  titulo: string; // Título do artigo
  conteudo: string; // Conteúdo do artigo
  autor_id: number; // ID do autor (referência ao usuário)
  data_publicacao?: Date; // Data de publicação (opcional)
  data_alteracao?: Date; // Data da última alteração (opcional)
  imagem?: string | null; // Caminho da imagem do artigo (opcional)
  nome?: string; // Nome do autor (opcional, usado em joins)
}

// Função para criar um novo artigo
export async function createArticle(article: Article): Promise<void> {
  const sql = `
    INSERT INTO articles (titulo, conteudo, autor_id, imagem, data_publicacao, data_alteracao)
    VALUES (?, ?, ?, ?, NOW(), NOW())
  `;
  await connection.query(sql, [
    article.titulo,
    article.conteudo,
    article.autor_id,
    article.imagem ?? null, // Se não houver imagem, salva como null
  ]);
}

// Função para listar todos os artigos, trazendo também o nome do autor
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

// Função para buscar um artigo pelo ID, trazendo também o nome do autor
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
  return articles.length > 0 ? articles[0] : null; // Retorna o artigo ou null se não encontrar
}

// Função para atualizar um artigo (apenas pelo autor)
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

// Função para deletar um artigo (apenas pelo autor)
export async function deleteArticle(id: number, autor_id: number): Promise<void> {
  const sql = `DELETE FROM articles WHERE id = ? AND autor_id = ?`;
  await connection.query(sql, [id, autor_id]);
}

// Função para listar todos os artigos de um usuário específico (usada para área do usuário)
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

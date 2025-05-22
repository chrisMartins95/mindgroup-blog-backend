import { Request, Response } from "express";
import { 
  Article, 
  createArticle, 
  getAllArticles, 
  getArticleById, 
  updateArticle, 
  deleteArticle,
  getArticlesByUserId // ⬅️ IMPORTANTE: certifique-se de ter isso no model
} from "../models/article.model";

export async function createArticleController(req: Request, res: Response) {
  const user = (req as any).user;
  const { titulo, conteudo } = req.body;
  const imagem = req.file?.filename;

  try {
    if (!titulo || !conteudo) {
      res.status(400).json({ error: "Título e conteúdo são obrigatórios" });
      return;
    }

    await createArticle({
      titulo,
      conteudo,
      autor_id: user.id,
      imagem,
    });

    res.status(201).json({ message: "Artigo criado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getAllArticlesController(req: Request, res: Response) {
  try {
    const articles = await getAllArticles();
    res.json(articles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getArticleByIdController(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    const article = await getArticleById(id);
    if (!article) {
      res.status(404).json({ error: "Artigo não encontrado" });
      return;
    }

    res.json(article);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateArticleController(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);
  const { titulo, conteudo } = req.body;
  const imagem = req.file?.filename;

  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }
  if (!titulo || !conteudo) {
    res.status(400).json({ error: "Título e conteúdo são obrigatórios" });
    return;
  }

  try {
    await updateArticle({
      id,
      titulo,
      conteudo,
      autor_id: user.id,
      imagem,
    });
    res.json({ message: "Artigo atualizado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteArticleController(req: Request, res: Response) {
  const user = (req as any).user;
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ error: "ID inválido" });
    return;
  }

  try {
    await deleteArticle(id, user.id);
    res.json({ message: "Artigo deletado com sucesso" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMyArticlesController(req: Request, res: Response) {
  const userId = (req as any).user.id;

  try {
    const articles = await getArticlesByUserId(userId); // <-- usa função do model
    res.json(articles);
  } catch (err: any) {
    console.error("Erro ao buscar artigos do usuário:", err);
    res.status(500).json({ error: "Erro ao buscar seus artigos" });
  }
}

import { Request, Response } from "express";
import { 
  Article, 
  createArticle, 
  getAllArticles, 
  getArticleById, 
  updateArticle, 
  deleteArticle 
} from "../models/article.model";

export async function createArticleController(req: Request, res: Response) {
  const user = (req as any).user; // do middleware
  const { titulo, conteudo } = req.body;

  try {
    if (!titulo || !conteudo) {
      res.status(400).json({ error: "Título e conteúdo são obrigatórios" });
      return;
    }

    await createArticle({
      titulo,
      conteudo,
      autor_id: user.id,
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

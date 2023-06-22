import { Router, Request, Response } from "express";
import { Produto } from "../models/Produto";

const produtoRouter: Router = Router();

produtoRouter.get(
  "/produto",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const todosProdutos: Produto[] = await Produto.findAll();
      return res.status(200).json(todosProdutos);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

produtoRouter.get(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const produto: Produto | null = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: "Produto not found" });
      }
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

produtoRouter.post(
  "/produto",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const produto: Produto = await Produto.create({
        ...req.body,
      });
      return res.status(201).json(produto);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

produtoRouter.put(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await Produto.update({ ...req.body }, { where: { id } });
      const updatedProduto: Produto | null = await Produto.findByPk(id);
      if (!updatedProduto) {
        return res.status(404).json({ error: "Produto not found" });
      }
      return res.status(200).json(updatedProduto);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

produtoRouter.delete(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedProduto: Produto | null = await Produto.findByPk(id);
      if (!deletedProduto) {
        return res.status(404).json({ error: "Produto not found" });
      }
      await Produto.destroy({ where: { id } });
      return res.status(200).json(deletedProduto);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

export { produtoRouter };

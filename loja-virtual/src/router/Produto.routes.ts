import { Router,  Request, Response } from "express";
import { Produto } from "../models/Produto";

const produtoRouter: Router = Router();

produtoRouter.get(
  "/produto",
  async (req: Request, res: Response): Promise<Response> => {
    const todosProdutos: Produto[] = await Produto.findAll();
    return res.status(200).json(todosProdutos);
  }
);

produtoRouter.get(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const produto: Produto | null = await Produto.findByPk(id);
    return res.status(200).json(produto);
  }
);

produtoRouter.post(
  "/produto",
  async (req: Request, res: Response): Promise<Response> => {
    const produto: Produto = await Produto.create({
      ...req.body,
    });
    return res.status(201).json(produto);
  }
);

produtoRouter.put(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Produto.update({ ...req.body }, { where: { id } });
    const updatedProduto: Produto | null = await Produto.findByPk(id);
    return res.status(200).json(updatedProduto);
  }
);

produtoRouter.delete(
  "/produto/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedProduto: Produto | null = await Produto.findByPk(id);
    await Produto.destroy({ where: { id } });
    return res.status(200).json(deletedProduto);
  }
);
export { produtoRouter };

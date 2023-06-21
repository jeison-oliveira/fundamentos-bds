import { Router,  Request, Response } from "express";
import { Categoria } from "../models/Categoria";

const categoriaRouter: Router = Router();

categoriaRouter.get(
  "/categoria",
  async (req: Request, res: Response): Promise<Response> => {
    const todasCategorias: Categoria[] = await Categoria.findAll();
    return res.status(200).json(todasCategorias);
  }
);

categoriaRouter.get(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const categoria: Categoria | null = await Categoria.findByPk(id);
    return res.status(200).json(categoria);
  }
);

categoriaRouter.post(
  "/categoria",
  async (req: Request, res: Response): Promise<Response> => {
    const categoria: Categoria = await Categoria.create({
      ...req.body,
    });
    return res.status(201).json(categoria);
  }
);

categoriaRouter.put(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Categoria.update({ ...req.body }, { where: { id } });
    const updatedCategoria: Categoria | null = await Categoria.findByPk(id);
    return res.status(200).json(updatedCategoria);
  }
);

categoriaRouter.delete(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedCategoria: Categoria | null = await Categoria.findByPk(id);
    await Categoria.destroy({ where: { id } });
    return res.status(200).json(deletedCategoria);
  }
);
export { categoriaRouter };

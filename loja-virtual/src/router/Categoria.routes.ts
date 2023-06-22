import { Router, Request, Response } from "express";
import { Categoria } from "../models/Categoria";

const categoriaRouter: Router = Router();

categoriaRouter.get(
  "/categoria",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const todasCategorias: Categoria[] = await Categoria.findAll();
      return res.status(200).json(todasCategorias);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

categoriaRouter.get(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const categoria: Categoria | null = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ error: "Categoria not found" });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

categoriaRouter.post(
  "/categoria",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const categoria: Categoria = await Categoria.create({
        ...req.body,
      });
      return res.status(201).json(categoria);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

categoriaRouter.put(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await Categoria.update({ ...req.body }, { where: { id } });
      const updatedCategoria: Categoria | null = await Categoria.findByPk(id);
      if (!updatedCategoria) {
        return res.status(404).json({ error: "Categoria not found" });
      }
      return res.status(200).json(updatedCategoria);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

categoriaRouter.delete(
  "/categoria/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedCategoria: Categoria | null = await Categoria.findByPk(id);
      if (!deletedCategoria) {
        return res.status(404).json({ error: "Categoria not found" });
      }
      await Categoria.destroy({ where: { id } });
      return res.status(200).json(deletedCategoria);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

export { categoriaRouter };

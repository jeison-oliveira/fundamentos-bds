import { Router, Request, Response } from "express";
import { Venda } from "../models/Venda";

const vendaRouter: Router = Router();

vendaRouter.get(
  "/venda",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const todasVendas: Venda[] = await Venda.findAll();
      return res.status(200).json(todasVendas);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

vendaRouter.post(
  "/venda",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const venda: Venda = await Venda.create({
        ...req.body,
      });
      return res.status(201).json(venda);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

vendaRouter.put(
  "/venda/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await Venda.update({ ...req.body }, { where: { id } });
      const updatedVenda: Venda | null = await Venda.findByPk(id);
      if (!updatedVenda) {
        return res.status(404).json({ error: "Venda not found" });
      }
      return res.status(200).json(updatedVenda);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

export { vendaRouter };

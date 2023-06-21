import { Router,  Request, Response } from "express";
import { Venda } from "../models/Venda";

const vendaRouter: Router = Router();

vendaRouter.get(
  "/venda",
  async (req: Request, res: Response): Promise<Response> => {
    const todasVendas: Venda[] = await Venda.findAll();
    return res.status(200).json(todasVendas);
  }
);

vendaRouter.get(
  "/venda/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const venda: Venda | null = await Venda.findByPk(id);
    return res.status(200).json(venda);
  }
);

vendaRouter.post(
  "/venda",
  async (req: Request, res: Response): Promise<Response> => {
    const venda: Venda = await Venda.create({
      ...req.body,
    });
    return res.status(201).json(venda);
  }
);

vendaRouter.put(
  "/venda/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Venda.update({ ...req.body }, { where: { id } });
    const updatedVenda: Venda | null = await Venda.findByPk(id);
    return res.status(200).json(updatedVenda);
  }
);

vendaRouter.delete(
  "/venda/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedVenda: Venda | null = await Venda.findByPk(id);
    await Venda.destroy({ where: { id } });
    return res.status(200).json(deletedVenda);
  }
);
export { vendaRouter };

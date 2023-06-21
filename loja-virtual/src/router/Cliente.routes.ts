import { Router,  Request, Response } from "express";
import { Cliente } from "../models/Cliente";

const clienteRouter: Router = Router();

clienteRouter.get(
  "/cliente",
  async (req: Request, res: Response): Promise<Response> => {
    const todosClientes: Cliente[] = await Cliente.findAll();
    return res.status(200).json(todosClientes);
  }
);

clienteRouter.get(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const cliente: Cliente | null = await Cliente.findByPk(id);
    return res.status(200).json(cliente);
  }
);

clienteRouter.post(
  "/cliente",
  async (req: Request, res: Response): Promise<Response> => {
    const cliente: Cliente = await Cliente.create({
      ...req.body,
    });
    return res.status(201).json(cliente);
  }
);

clienteRouter.put(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Cliente.update({ ...req.body }, { where: { id } });
    const updatedCliente: Cliente | null = await Cliente.findByPk(id);
    return res.status(200).json(updatedCliente);
  }
);

clienteRouter.delete(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedCliente: Cliente | null = await Cliente.findByPk(id);
    await Cliente.destroy({ where: { id } });
    return res.status(200).json(deletedCliente);
  }
);
export { clienteRouter };

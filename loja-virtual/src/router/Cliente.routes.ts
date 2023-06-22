import { Router, Request, Response } from "express";
import { Cliente } from "../models/Cliente";

const clienteRouter: Router = Router();

clienteRouter.get(
  "/cliente",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const todosClientes: Cliente[] = await Cliente.findAll();
      return res.status(200).json(todosClientes);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

clienteRouter.get(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const cliente: Cliente | null = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente not found" });
      }
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

clienteRouter.post(
  "/cliente",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const cliente: Cliente = await Cliente.create({
        ...req.body,
      });
      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

clienteRouter.put(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await Cliente.update({ ...req.body }, { where: { id } });
      const updatedCliente: Cliente | null = await Cliente.findByPk(id);
      if (!updatedCliente) {
        return res.status(404).json({ error: "Cliente not found" });
      }
      return res.status(200).json(updatedCliente);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

clienteRouter.delete(
  "/cliente/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const deletedCliente: Cliente | null = await Cliente.findByPk(id);
      if (!deletedCliente) {
        return res.status(404).json({ error: "Cliente not found" });
      }
      await Cliente.destroy({ where: { id } });
      return res.status(200).json(deletedCliente);
    } catch (error) {
      return res.status(500).json({ error: error?.toString() });
    }
  }
);

export { clienteRouter };

import { Router, Request, Response } from "express";
import { Departamentos } from "../models/Departamentos";

const departamentosRouter: Router = Router();

departamentosRouter.get(
  "/departamentos",
  async (req: Request, res: Response): Promise<Response> => {
    const todosDepartamentos: Departamentos[] = await Departamentos.findAll();
    return res.status(200).json(todosDepartamentos);
  }
);

departamentosRouter.get(
  "/departamentos/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const departamento: Departamentos | null = await Departamentos.findByPk(id);
    return res.status(200).json(departamento);
  }
);

departamentosRouter.post(
  "/departamentos",
  async (req: Request, res: Response): Promise<Response> => {
    const departamento: Departamentos = await Departamentos.create({
      ...req.body,
    });
    return res.status(201).json(departamento);
  }
);

departamentosRouter.put(
  "/departamentos/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Departamentos.update({ ...req.body }, { where: { id } });
    const updatedDepartamento: Departamentos | null =
      await Departamentos.findByPk(id);
    return res.status(200).json(updatedDepartamento);
  }
);

departamentosRouter.delete(
  "/departamentos/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedDepartamento: Departamentos | null =
      await Departamentos.findByPk(id);
    await Departamentos.destroy({ where: { id } });
    return res.status(200).json(deletedDepartamento);
  }
);
export { departamentosRouter };

import { Router, Request, Response } from "express";
import { Dependentes } from "../models/Dependentes";

const dependentesRouter: Router = Router();

dependentesRouter.get(
  "/dependentes",
  async (req: Request, res: Response): Promise<Response> => {
    const todosDependentes: Dependentes[] = await Dependentes.findAll();
    return res.status(200).json(todosDependentes);
  }
);

dependentesRouter.get(
  "/dependentes/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const funcionario: Dependentes | null = await Dependentes.findByPk(id);
    return res.status(200).json(funcionario);
  }
);

dependentesRouter.post(
  "/dependentes",
  async (req: Request, res: Response): Promise<Response> => {
    const funcionario: Dependentes = await Dependentes.create({
      ...req.body,
    });
    return res.status(201).json(funcionario);
  }
);

dependentesRouter.put(
  "/dependentes/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Dependentes.update({ ...req.body }, { where: { id } });
    const updatedFuncionario: Dependentes | null = await Dependentes.findByPk(
      id
    );
    return res.status(200).json(updatedFuncionario);
  }
);

dependentesRouter.delete(
  "/dependentes/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedFuncionario: Dependentes | null = await Dependentes.findByPk(
      id
    );
    await Dependentes.destroy({ where: { id } });
    return res.status(200).json(deletedFuncionario);
  }
);
export { dependentesRouter };

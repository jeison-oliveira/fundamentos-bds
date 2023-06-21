import { Router, Request, Response } from "express";
import { Dependentes } from "../models/Dependentes";
import { Funcionarios } from "../models/Funcionarios";

const funcionariosRouter: Router = Router();

// funcionariosRouter.get(
//   "/funcionarios",
//   async (req: Request, res: Response): Promise<Response> => {
//     const todosFuncionarios: Funcionarios[] = await Funcionarios.findAll();
//     return res.status(200).json(todosFuncionarios);
//   }
// );

funcionariosRouter.get(
  "/funcionarios/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const funcionario: Funcionarios | null = await Funcionarios.findByPk(id);
    return res.status(200).json(funcionario);
  }
);

funcionariosRouter.post(
  "/funcionarios",
  async (req: Request, res: Response): Promise<Response> => {
    const funcionario: Funcionarios = await Funcionarios.create({
      ...req.body,
    });
    return res.status(201).json(funcionario);
  }
);

funcionariosRouter.put(
  "/funcionarios/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await Funcionarios.update({ ...req.body }, { where: { id } });
    const updatedFuncionario: Funcionarios | null = await Funcionarios.findByPk(
      id
    );
    return res.status(200).json(updatedFuncionario);
  }
);

funcionariosRouter.delete(
  "/funcionarios/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const deletedFuncionario: Funcionarios | null = await Funcionarios.findByPk(
      id
    );
    await Funcionarios.destroy({ where: { id } });
    return res.status(200).json(deletedFuncionario);
  }
);

funcionariosRouter.get(
  "/funcionarios",
  async (req: Request, res: Response): Promise<Response> => {
    const result = await Funcionarios.findAndCountAll();
    const quantidade = result.count;
    console.log(result.count);

    const funcionarios: Funcionarios[] | null = result.rows;
    console.log(funcionarios);
    const objetoRetorno: any = {
      quantidade,
      funcionarios,
    };
    return res.status(200).json(objetoRetorno);
  }
);
funcionariosRouter.get("/funcionarios/:id/dependentes", async (req, res) => {
  const { id } = req.params;
  const funcionario = await Funcionarios.findOne({
    where: { id },
    include: [
      {
        model: Dependentes,
        as: "dependentes",
      },
    ],
  });

  return res.json(funcionario?.dependentes);
});
export { funcionariosRouter };

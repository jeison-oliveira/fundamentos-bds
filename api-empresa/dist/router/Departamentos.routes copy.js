"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.departamentosRouter = void 0;
const express_1 = require("express");
const Departamentos_1 = require("../models/Departamentos");
const departamentosRouter = (0, express_1.Router)();
exports.departamentosRouter = departamentosRouter;
departamentosRouter.get("/departamentos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosDepartamentos = yield Departamentos_1.Departamentos.findAll();
    return res.status(200).json(todosDepartamentos);
}));
departamentosRouter.get("/departamentos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const departamento = yield Departamentos_1.Departamentos.findByPk(id);
    return res.status(200).json(departamento);
}));
departamentosRouter.post("/departamentos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departamento = yield Departamentos_1.Departamentos.create(Object.assign({}, req.body));
    return res.status(201).json(departamento);
}));
departamentosRouter.put("/departamentos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Departamentos_1.Departamentos.update(Object.assign({}, req.body), { where: { id } });
    const updatedDepartamento = yield Departamentos_1.Departamentos.findByPk(id);
    return res.status(200).json(updatedDepartamento);
}));
departamentosRouter.delete("/departamentos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedDepartamento = yield Departamentos_1.Departamentos.findByPk(id);
    yield Departamentos_1.Departamentos.destroy({ where: { id } });
    return res.status(200).json(deletedDepartamento);
}));

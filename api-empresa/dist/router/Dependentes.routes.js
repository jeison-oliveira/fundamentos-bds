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
exports.dependentesRouter = void 0;
const express_1 = require("express");
const Dependentes_1 = require("../models/Dependentes");
const dependentesRouter = (0, express_1.Router)();
exports.dependentesRouter = dependentesRouter;
dependentesRouter.get("/dependentes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosDependentes = yield Dependentes_1.Dependentes.findAll();
    return res.status(200).json(todosDependentes);
}));
dependentesRouter.get("/dependentes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const funcionario = yield Dependentes_1.Dependentes.findByPk(id);
    return res.status(200).json(funcionario);
}));
dependentesRouter.post("/dependentes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const funcionario = yield Dependentes_1.Dependentes.create(Object.assign({}, req.body));
    return res.status(201).json(funcionario);
}));
dependentesRouter.put("/dependentes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Dependentes_1.Dependentes.update(Object.assign({}, req.body), { where: { id } });
    const updatedFuncionario = yield Dependentes_1.Dependentes.findByPk(id);
    return res.status(200).json(updatedFuncionario);
}));
dependentesRouter.delete("/dependentes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedFuncionario = yield Dependentes_1.Dependentes.findByPk(id);
    yield Dependentes_1.Dependentes.destroy({ where: { id } });
    return res.status(200).json(deletedFuncionario);
}));

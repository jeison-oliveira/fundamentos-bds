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
exports.projetosRouter = void 0;
const express_1 = require("express");
const Projetos_1 = require("../models/Projetos");
const projetosRouter = (0, express_1.Router)();
exports.projetosRouter = projetosRouter;
projetosRouter.get("/projeto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todosProjetos = yield Projetos_1.Projetos.findAll();
    return res.status(200).json(todosProjetos);
}));
projetosRouter.get("/projeto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const projeto = yield Projetos_1.Projetos.findByPk(id);
    return res.status(200).json(projeto);
}));
projetosRouter.post("/projeto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projeto = yield Projetos_1.Projetos.create(Object.assign({}, req.body));
    return res.status(201).json(projeto);
}));
projetosRouter.put("/projeto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Projetos_1.Projetos.update(Object.assign({}, req.body), { where: { id } });
    const updatedProjeto = yield Projetos_1.Projetos.findByPk(id);
    return res.status(200).json(updatedProjeto);
}));
projetosRouter.delete("/projeto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedProjeto = yield Projetos_1.Projetos.findByPk(id);
    yield Projetos_1.Projetos.destroy({ where: { id } });
    return res.status(200).json(deletedProjeto);
}));

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
exports.categoriaRouter = void 0;
const express_1 = require("express");
const Categoria_1 = require("../models/Categoria");
const categoriaRouter = (0, express_1.Router)();
exports.categoriaRouter = categoriaRouter;
categoriaRouter.get("/categoria", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todasCategorias = yield Categoria_1.Categoria.findAll();
    return res.status(200).json(todasCategorias);
}));
categoriaRouter.get("/categoria/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const categoria = yield Categoria_1.Categoria.findByPk(id);
    return res.status(200).json(categoria);
}));
categoriaRouter.post("/categoria", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield Categoria_1.Categoria.create(Object.assign({}, req.body));
    return res.status(201).json(categoria);
}));
categoriaRouter.put("/categoria/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Categoria_1.Categoria.update(Object.assign({}, req.body), { where: { id } });
    const updatedCategoria = yield Categoria_1.Categoria.findByPk(id);
    return res.status(200).json(updatedCategoria);
}));
categoriaRouter.delete("/categoria/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedCategoria = yield Categoria_1.Categoria.findByPk(id);
    yield Categoria_1.Categoria.destroy({ where: { id } });
    return res.status(200).json(deletedCategoria);
}));

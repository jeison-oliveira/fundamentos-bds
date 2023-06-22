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
exports.produtoRouter = void 0;
const express_1 = require("express");
const Produto_1 = require("../models/Produto");
const produtoRouter = (0, express_1.Router)();
exports.produtoRouter = produtoRouter;
produtoRouter.get("/produto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todosProdutos = yield Produto_1.Produto.findAll();
        return res.status(200).json(todosProdutos);
    }
    catch (error) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.toString() });
    }
}));
produtoRouter.get("/produto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const produto = yield Produto_1.Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ error: "Produto not found" });
        }
        return res.status(200).json(produto);
    }
    catch (error) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.toString() });
    }
}));
produtoRouter.post("/produto", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produto = yield Produto_1.Produto.create(Object.assign({}, req.body));
        return res.status(201).json(produto);
    }
    catch (error) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.toString() });
    }
}));
produtoRouter.put("/produto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Produto_1.Produto.update(Object.assign({}, req.body), { where: { id } });
        const updatedProduto = yield Produto_1.Produto.findByPk(id);
        if (!updatedProduto) {
            return res.status(404).json({ error: "Produto not found" });
        }
        return res.status(200).json(updatedProduto);
    }
    catch (error) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.toString() });
    }
}));
produtoRouter.delete("/produto/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduto = yield Produto_1.Produto.findByPk(id);
        if (!deletedProduto) {
            return res.status(404).json({ error: "Produto not found" });
        }
        yield Produto_1.Produto.destroy({ where: { id } });
        return res.status(200).json(deletedProduto);
    }
    catch (error) {
        return res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.toString() });
    }
}));

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
exports.vendaRouter = void 0;
const express_1 = require("express");
const Venda_1 = require("../models/Venda");
const vendaRouter = (0, express_1.Router)();
exports.vendaRouter = vendaRouter;
vendaRouter.get("/venda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todasVendas = yield Venda_1.Venda.findAll();
    return res.status(200).json(todasVendas);
}));
vendaRouter.get("/venda/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const venda = yield Venda_1.Venda.findByPk(id);
    return res.status(200).json(venda);
}));
vendaRouter.post("/venda", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venda = yield Venda_1.Venda.create(Object.assign({}, req.body));
    return res.status(201).json(venda);
}));
vendaRouter.put("/venda/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Venda_1.Venda.update(Object.assign({}, req.body), { where: { id } });
    const updatedVenda = yield Venda_1.Venda.findByPk(id);
    return res.status(200).json(updatedVenda);
}));
vendaRouter.delete("/venda/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedVenda = yield Venda_1.Venda.findByPk(id);
    yield Venda_1.Venda.destroy({ where: { id } });
    return res.status(200).json(deletedVenda);
}));

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const express_1 = __importDefault(require("express"));
const api_info_1 = require("./api.info");
const config_1 = __importDefault(require("./db/config"));
const migracoes_1 = require("./db/migracoes");
const Categoria_1 = require("./models/Categoria");
const Cliente_1 = require("./models/Cliente");
const Produto_1 = require("./models/Produto");
const Venda_1 = require("./models/Venda");
const VersaoDB_1 = require("./models/VersaoDB");
const Categoria_routes_1 = require("./router/Categoria.routes");
const Cliente_routes_1 = require("./router/Cliente.routes");
const Produto_routes_1 = require("./router/Produto.routes");
const Venda_routes_1 = require("./router/Venda.routes");
class Api {
    constructor() {
        this.routes = [Categoria_routes_1.categoriaRouter, Cliente_routes_1.clienteRouter, Produto_routes_1.produtoRouter, Venda_routes_1.vendaRouter];
        this.models = [VersaoDB_1.VersaoDB, Categoria_1.Categoria, Cliente_1.Cliente, Produto_1.Produto, Venda_1.Venda];
        this.server = (0, express_1.default)();
    }
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.middleware();
                yield this.router();
                yield this.initModels();
                yield this.migrations();
            }
            catch (err) {
                console.error(err);
            }
            return this;
        });
    }
    middleware() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use(express_1.default.json());
        });
    }
    router() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.use(this.routes);
            try {
                yield this.server.listen(api_info_1.api.defaultPort);
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    initModels() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default
                .authenticate()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                console.info("MySQL DB Conectado!");
                yield config_1.default.addModels(this.models);
                yield config_1.default.sync();
            }))
                .then(() => {
                console.info("DB sync!");
            })
                .catch((err) => {
                console.error(err);
                throw err;
            });
        });
    }
    migrations() {
        return __awaiter(this, void 0, void 0, function* () {
            let versaoAtualBanco = yield VersaoDB_1.VersaoDB.findByPk(api_info_1.api.db.id);
            let numeroVersaoAtualBanco = versaoAtualBanco == null ? 0 : versaoAtualBanco.numeroVersao;
            console.info("VERSAO DO BANCO Loja-Virtual: " + numeroVersaoAtualBanco);
            if (numeroVersaoAtualBanco < api_info_1.api.db.dbVersion) {
                console.info(migracoes_1.migracoes);
                let models = [];
                for (let i = numeroVersaoAtualBanco; i < api_info_1.api.db.dbVersion; i++) {
                    const migracao = migracoes_1.migracoes.get(i + 1);
                    if (migracao && migracao.consultas) {
                        if (migracao.consultas !== null) {
                            for (const consulta of migracao.consultas) {
                                console.info("executando: " + consulta.query);
                                if (models.indexOf(consulta.model) < 0) {
                                    yield config_1.default.query(consulta.query);
                                    console.info(" executed!");
                                }
                                else {
                                    console.info(" not executed: new model.");
                                }
                            }
                        }
                    }
                }
                if (versaoAtualBanco == null) {
                    yield VersaoDB_1.VersaoDB.create({
                        id: api_info_1.api.db.id,
                        numeroVersao: api_info_1.api.db.dbVersion,
                    });
                }
                else {
                    versaoAtualBanco.numeroVersao = api_info_1.api.db.dbVersion;
                    yield versaoAtualBanco.save();
                }
            }
            yield config_1.default
                .sync()
                .then(() => {
                console.info("Models sync!");
            })
                .catch((error) => {
                console.error(error);
            });
        });
    }
}
exports.Api = Api;

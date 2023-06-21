import express from "express";
import { api } from "./api.info";
import connection from "./db/config";
import { MigracaoDB, migracoes } from "./db/migracoes";
import { Categoria } from "./models/Categoria";
import { Cliente } from "./models/Cliente";
import { Produto } from "./models/Produto";
import { Venda } from "./models/Venda";
import { VersaoDB } from "./models/VersaoDB";
import { categoriaRouter } from "./router/Categoria.routes";
import { clienteRouter } from "./router/Cliente.routes";
import { produtoRouter } from "./router/Produto.routes";
import { vendaRouter } from "./router/Venda.routes";

export class Api {
  routes = [categoriaRouter, clienteRouter, produtoRouter, vendaRouter];
  models = [VersaoDB, Categoria, Cliente, Produto, Venda];

  server: express.Application;

  constructor() {
    this.server = express();
  }

  async bootstrap(): Promise<Api> {
    try {
      await this.middleware();
      await this.router();
      await this.initModels();
      await this.migrations();
    } catch (err) {
      console.error(err);
    }
    return this;
  }
  private async middleware() {
    this.server.use(express.json());
  }
  private async router() {
    this.server.use(this.routes);
    try {
      await this.server.listen(api.defaultPort);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private async initModels() {
    await connection
      .authenticate()
      .then(async () => {
        console.info("MySQL DB Conectado!");
        await connection.addModels(this.models);
        await connection.sync();
      })
      .then(() => {
        console.info("DB sync!");
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  private async migrations() {
    let versaoAtualBanco = await VersaoDB.findByPk(api.db.id);
    let numeroVersaoAtualBanco =
      versaoAtualBanco == null ? 0 : versaoAtualBanco.numeroVersao;
    console.info("VERSAO DO BANCO Loja-Virtual: " + numeroVersaoAtualBanco);
    if (numeroVersaoAtualBanco < api.db.dbVersion) {
      console.info(migracoes);
      let models: string[] = [];
      for (let i = numeroVersaoAtualBanco; i < api.db.dbVersion; i++) {
        const migracao: MigracaoDB | undefined = migracoes.get(i + 1);
        if (migracao && migracao.consultas) {
          if (migracao.consultas !== null) {
            for (const consulta of migracao.consultas) {
              console.info("executando: " + consulta.query);
              if (models.indexOf(consulta.model) < 0) {
                await connection.query(consulta.query);
                console.info(" executed!");
              } else {
                console.info(" not executed: new model.");
              }
            }
          }
        }
      }
      if (versaoAtualBanco == null) {
        await VersaoDB.create({
          id: api.db.id,
          numeroVersao: api.db.dbVersion,
        });
      } else {
        versaoAtualBanco.numeroVersao = api.db.dbVersion;
        await versaoAtualBanco.save();
      }
    }
    await connection
      .sync()
      .then(() => {
        console.info("Models sync!");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

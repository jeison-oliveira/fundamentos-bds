"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migracoes = void 0;
const migracoes = new Map();
exports.migracoes = migracoes;
/*
migracoes.set(0, {
  consultas: [
    {
      model: "Dependentes",
      query: `CREATE TABLE Dependentes`,
    },
  ],
});*/
migracoes.set(1, {
    consultas: [
        {
            model: "Dependentes",
            query: `ALTER TABLE Dependentes ADD atributo_adicionado VARCHAR(45);`,
        },
    ],
}); /*
migracoes.set(3, {
  consultas: [
    {
      model: "Dependentes",
      query: `ALTER TABLE Dependentes CHANGE atributo_adicionado endereco
    VARCHAR(45);`,
    },
  ],
});
migracoes.set(4, {
  consultas: [
    {
      model: "Dependentes",
      query: `ALTER TABLE Dependentes DROP COLUMN endereco;`,
    },
    {
      model: "Dependentes",
      query: `ALTER TABLE Dependentes DROP COLUMN atributo_adicionado_2;`,
    },
  ],
});
migracoes.set(5, {
  consultas: [
    {
      model: "Dependentes",
      query: `DROP TABLE Dependentes`,
    },
  ],
});*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migracoes = void 0;
const migracoes = new Map();
exports.migracoes = migracoes;
migracoes.set(1, {
    consultas: [
        {
            model: "Clientes",
            query: `ALTER TABLE Clientes ADD sexo CHAR(1);`,
        },
    ],
});
migracoes.set(2, {
    consultas: [
        {
            model: "Clientes",
            query: `ALTER TABLE Clientes CHANGE sexo sexo_escrito
    VARCHAR(45);`,
        },
    ],
});
migracoes.set(3, {
    consultas: [
        {
            model: "Clientes",
            query: `ALTER TABLE Clientes DROP COLUMN sexo_escrito;`,
        },
    ],
});

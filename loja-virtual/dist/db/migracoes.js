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
            query: `ALTER TABLE Clientes CHANGE sexo endereco
    VARCHAR(45);`,
        },
    ],
});

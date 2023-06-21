"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "webacademy",
    password: "Web@cad123",
    port: 3306,
    database: "loja_virtual",
    logging: false,
});
exports.default = connection;

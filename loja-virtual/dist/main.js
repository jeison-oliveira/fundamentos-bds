"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_info_1 = require("./api.info");
const server_1 = require("./server");
const server = new server_1.Api();
try {
    server.bootstrap().then((server) => {
        console.info(`Loja Virtual rodando na porta ${api_info_1.api.defaultPort}`);
    });
}
catch (error) {
    console.error("Server failed to start.");
    console.error(error);
    process.exit(1);
}

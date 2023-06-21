"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Departamentos = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Funcionarios_1 = require("./Funcionarios");
// import { Projetos } from "./Projetos";
let Departamentos = exports.Departamentos = class Departamentos extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)("all"),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV1,
    }),
    __metadata("design:type", String)
], Departamentos.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Departamentos.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Departamentos.prototype, "sigla", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Funcionarios_1.Funcionarios),
    (0, sequelize_typescript_1.AllowNull)(true),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Departamentos.prototype, "gestorId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Funcionarios_1.Funcionarios, "gestorId"),
    __metadata("design:type", Funcionarios_1.Funcionarios)
], Departamentos.prototype, "gestor", void 0);
exports.Departamentos = Departamentos = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    })
], Departamentos);

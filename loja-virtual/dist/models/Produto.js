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
exports.Produto = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Categoria_1 = require("./Categoria");
const Cliente_1 = require("./Cliente");
const Venda_1 = require("./Venda");
let Produto = exports.Produto = class Produto extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)("all"),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV1,
    }),
    __metadata("design:type", String)
], Produto.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Unique,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
    }),
    __metadata("design:type", Number)
], Produto.prototype, "preco", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Produto.prototype, "quantidade", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Categoria_1.Categoria),
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
    }),
    __metadata("design:type", String)
], Produto.prototype, "categoriaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Categoria_1.Categoria),
    __metadata("design:type", Categoria_1.Categoria)
], Produto.prototype, "categoria", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Cliente_1.Cliente, () => Venda_1.Venda),
    __metadata("design:type", Array)
], Produto.prototype, "clientes", void 0);
exports.Produto = Produto = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
    })
], Produto);

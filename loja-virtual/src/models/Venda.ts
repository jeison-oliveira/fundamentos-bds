import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  IsEmail,
  Unique,
  HasMany,
  ForeignKey
} from "sequelize-typescript";
import { Cliente } from "./Cliente";
import { Produto } from "./Produto";

@Table({
  timestamps: true,
})
export class Venda extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;
  
  @PrimaryKey
  @ForeignKey(() => Produto)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  produtoId!: string;
  
  @PrimaryKey
  @ForeignKey(() => Cliente)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  clienteId!: string;
}

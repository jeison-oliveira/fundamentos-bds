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
  HasMany
} from "sequelize-typescript";
import { Produto } from "./Produto";

@Table({
  timestamps: true,
})
export class Categoria extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  descricao!: string;

  @HasMany(() => Produto)
  produtos!: Produto[];
}

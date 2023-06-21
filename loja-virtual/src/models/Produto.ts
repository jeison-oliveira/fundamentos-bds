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
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from "sequelize-typescript";
import { Categoria } from "./Categoria";
import { Cliente } from "./Cliente";
import { Venda } from "./Venda";

@Table({
  timestamps: true,
})
export class Produto extends Model {
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

  @AllowNull(false)
  @Column({
    type: DataType.DOUBLE,
  })
  preco!: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  quantidade!: number;

  @ForeignKey(() => Categoria)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  categoriaId!: string;

  @BelongsTo(() => Categoria)
  categoria!: Categoria;

  @BelongsToMany(() => Cliente, () => Venda)
  clientes!: Cliente[];
}

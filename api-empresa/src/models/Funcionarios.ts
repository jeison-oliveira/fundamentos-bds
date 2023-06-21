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
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Departamentos } from "./Departamentos";
import { Dependentes } from "./Dependentes";
@Table({
  timestamps: true,
  paranoid: true,
})
export class Funcionarios extends Model {
  @IsUUID("all")
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  nome!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  fone!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email!: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  idade!: number;

  @ForeignKey(() => Departamentos)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  departamentoId!: string;

  @BelongsTo(() => Departamentos)
  departamento!: Departamentos;

  @HasMany(() => Dependentes)
  dependentes!: Dependentes[];
}

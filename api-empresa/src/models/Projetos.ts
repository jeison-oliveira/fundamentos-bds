import {
  Table,
  Model,
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Departamentos } from "./Departamentos";

@Table({
  timestamps: true,
  paranoid: true,
})
export class Projetos extends Model {
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

  @AllowNull(true)
  @Column({
    type: DataType.DATE,
  })
  dataFinalizacao!: string;

  @ForeignKey(() => Departamentos)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  departamentoId!: string;

  @BelongsTo(() => Departamentos)
  departamento!: Departamentos;
}

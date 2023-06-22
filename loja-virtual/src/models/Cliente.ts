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
  BelongsToMany,
} from "sequelize-typescript";
import { Produto } from "./Produto";
import { Venda } from "./Venda";

@Table({
  timestamps: true,
})
export class Cliente extends Model {
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
  nome!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  endereco!: string;

  @AllowNull(true)
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email!: string;
  /*
  @AllowNull(true)
  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  sexo!: string;
  //sexo_escrito!: string;
*/

  @BelongsToMany(() => Produto, () => Venda)
  produtos!: Produto[];
}

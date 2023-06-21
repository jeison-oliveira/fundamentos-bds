import { Sequelize } from "sequelize-typescript";
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "webacademy",
  password: "Web@cad123",
  port: 3306,
  database: "mydb",
  logging: false,
});
export default connection;

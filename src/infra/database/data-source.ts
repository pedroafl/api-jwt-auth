import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "jwtauth",
  entities: ["src/domain/entity/*.ts"],
  migrations: ["src/infra/database/migrations/*.ts"],
  subscribers: [],
});

import { DataSource, DataSourceOptions } from "typeorm";
import { dbConfig } from "../config/dbConfig";
const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: [`${__dirname}/entities/*.{ts,js}`],
  synchronize: false,
  migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
  subscribers: [`${__dirname}/subscribers/**/*.{ts,js}`],
  migrationsTableName: "_migrations",
};
export const AppDataSource = new DataSource(dataSourceOptions);

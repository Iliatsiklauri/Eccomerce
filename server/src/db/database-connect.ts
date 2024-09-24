import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";
import { Product } from "./entity/Product";
import { Comment } from "./entity/Comment";
import { Category } from "./entity/Category";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [User, Product, Comment, Category],
  subscribers: [],
  migrations: [],
});

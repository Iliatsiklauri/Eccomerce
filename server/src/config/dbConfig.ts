import dotenv from "dotenv";
dotenv.config();
export const dbConfig = {
  host: "postgres",
  port: 5432,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
};

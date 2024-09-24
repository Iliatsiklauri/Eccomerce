import "reflect-metadata";
import express from "express";
import Router from "./router/router";
import { AppDataSource } from "./db/database-connect";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

AppDataSource.initialize().then(async () => {
  console.log("connected to database");
});

app.listen(4000, () => {
  console.log("server started");
});
import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
} from "../controllers/category.controller";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", upload.single("image"), addCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;

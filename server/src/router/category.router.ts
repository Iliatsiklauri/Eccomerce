import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller";
import multer from "multer";
import AdminGuard from "../middleware/AdminGuard";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", AdminGuard, upload.single("image"), addCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", AdminGuard, updateCategory);
categoryRouter.delete("/:id", AdminGuard, deleteCategory);

export default categoryRouter;

import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller";
import multer from "multer";
import AdminGuard from "../middleware/AdminGuard";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", AdminGuard, upload.single("image"), createProduct);
productRouter.put("/:id", AdminGuard, upload.single("image"), updateProduct);
productRouter.delete("/:id", AdminGuard, deleteProduct);

export default productRouter;

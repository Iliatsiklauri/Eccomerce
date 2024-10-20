import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProduct,
  updateProduct,
} from "../controllers/product.controller";
import multer from "multer";
import AdminGuard from "../middleware/AdminGuard";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/search", searchProduct);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  AdminGuard,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pinnedImage", maxCount: 1 },
  ]),
  createProduct
);
productRouter.put(
  "/:id",
  AdminGuard,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pinnedImage", maxCount: 1 },
  ]),
  updateProduct
);
productRouter.delete("/:id", AdminGuard, deleteProduct);

export default productRouter;

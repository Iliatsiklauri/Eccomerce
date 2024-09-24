import { Request, Response } from "express";
import { productService } from "../services/product.service";
import {
  ErrorRes,
  productSchema,
  SuccessRes,
  updateProductSchema,
} from "../utils/validation";
import { categoryService } from "../services/category.service";

const productsService = new productService();
const categorysService = new categoryService();

export const getAllProducts = async (req: Request, res: Response) => {
  let page = parseInt(req.query.page as string) || 1;
  let limit = parseInt(req.query.limit as string) || 20;
  let skip = limit * (page - 1);
  const [products, total] = await productsService.getAllProducts(skip, limit);
  res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productsService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json(new ErrorRes(404, "Product not found"));
  }
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json(new ErrorRes(400, ["Image is required"]));
  }
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ErrorRes(
        400,
        error.details.map((detail) =>
          detail.message.replace(/\\n/g, " ").replace(/\"/g, "")
        )
      )
    );
  }

  const category = await categorysService.getCategoryByTitle({
    title: req.body.category,
  });
  if (!category)
    return res.status(404).json(new ErrorRes(404, "Invalid category"));
  await productsService.createProduct(
    { ...req.body, categoryId: category.id },
    req.file
  );
  return res
    .status(201)
    .json(new SuccessRes(201, "Product created successfully"));
};

export const updateProduct = async (req: Request, res: Response) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      new ErrorRes(
        400,
        error.details.map((detail) =>
          detail.message.replace(/\\n/g, " ").replace(/\"/g, "")
        )
      )
    );
  }

  if (req.file) {
    req.body.image = req.file;
  }

  const updated = await productsService.updatePost(req.body, req.params.id);
  if (!updated) return res.status(400).json(new ErrorRes(400, "Bad request"));
  res.send();
};

export const deleteProduct = async (req: Request, res: Response) => {
  const deletedProduct = await productsService.deletePost(req.params.id);
  if (!deletedProduct) {
    return res.status(404).json(new ErrorRes(404, "Product not found"));
  }
  res.status(204).send();
};

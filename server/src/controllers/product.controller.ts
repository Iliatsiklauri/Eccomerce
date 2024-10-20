import { Request, Response } from "express";
import { productService } from "../services/product.service";
import {
  ErrorRes,
  productSchema,
  SuccessRes,
  updateProductSchema,
} from "../utils/validation";
import { categoryService } from "../services/category.service";
import { Product } from "../db/entities/Product";

const productsService = new productService();
const categorysService = new categoryService();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 20;
    let pinned = req.query.pinned === "true";
    let skip = limit * (page - 1);
    let category = parseInt(req.query.category as string);
    let minPrice = parseInt(req.query.minPrice as string);
    let maxPrice = parseInt(req.query.maxPrice as string);
    let sort = req.query.sort as string;
    let promotion = req.query.promotion === "true";
    const [products, total] = await productsService.getAllProducts(
      skip,
      limit,
      category,
      pinned,
      minPrice,
      maxPrice,
      sort,
      promotion
    );
    if (!products) {
      return res
        .status(400)
        .json(new ErrorRes(400, "error while fetching products"));
    }
    res.status(200).json({ products, total });
  } catch (er) {
    console.log(er);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await productsService.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json(new ErrorRes(404, "Product not found"));
  }
  res.json(product);
};

export const searchProduct = async (req: Request, res: Response) => {
  const search = req.query.keyword.toString().toLocaleLowerCase();
  const products = await productsService.searchProductBySearch(search);
  if (products === 400) {
    return res
      .status(products)
      .json(new ErrorRes(products, "Error while searching for product"));
  }
  return res.json(products);
};

// create product

export const createProduct = async (req: Request, res: Response) => {
  let image = req.files?.["image"] || [];
  let pinnedImage = req.files?.["pinnedImage"] || [];

  if (!image) {
    return res.status(400).json(new ErrorRes(400, "image is required"));
  }
  if (!pinnedImage) {
    return res.status(400).json(new ErrorRes(400, "pinnedImage is required"));
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

  const category = await categorysService.getById(req.body.category);

  if (!category)
    return res.status(404).json(new ErrorRes(404, "Invalid category"));

  const createdProduct: Product = await productsService.createProduct({
    ...req.body,
    image,
    pinnedImage,
  });
  if (!createdProduct)
    return res
      .status(401)
      .json(new ErrorRes(401, "error while creating product"));
  return res.status(201).json(createdProduct);
};

export const updateProduct = async (req: Request, res: Response) => {
  const updateFilesDto = {
    image: req.files["image"],
    pinnedImage: req.files["pinnedImage"],
  };

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

  if (req.body.category) {
    const category = await categorysService.getById(req.body.category);
    if (!category)
      return res.status(404).json(new ErrorRes(404, "Invalid category"));
  }

  const updated = await productsService.updateProduct(
    req.body,
    updateFilesDto,
    req.params.id
  );

  if (!updated) return res.status(400).json(new ErrorRes(400, "Bad request"));
  if (updated === "imageEr")
    return res
      .status(409)
      .json(new ErrorRes(409, "Choose one property for image"));
  if (updated === "pinnedEr")
    return res
      .status(409)
      .json(new ErrorRes(409, "Choose one property for pinned image"));
  if (updated === 404)
    return res.status(404).json(new ErrorRes(404, "Product Not Found"));
  return res
    .status(200)
    .json(new SuccessRes(200, "Product updated successfully"));
};

export const deleteProduct = async (req: Request, res: Response) => {
  const deletedProduct = await productsService.deletePost(req.params.id);
  if (deletedProduct === 404) {
    return res.status(404).json(new ErrorRes(404, "Product not found"));
  }
  if (!deletedProduct) {
    return res
      .status(404)
      .json(new ErrorRes(404, "Error while deleting product"));
  }
  res.status(204).send();
};

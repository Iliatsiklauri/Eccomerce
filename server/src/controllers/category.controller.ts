import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import {
  createCategorySchema,
  ErrorRes,
  SuccessRes,
  updateCategoryShema,
} from "../utils/validation";

const categorysService = new categoryService();

export const getAllCategory = async (req: Request, res: Response) => {
  const categories = await categorysService.getAllCategories();
  return res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await categorysService.getById(req.params.id);
  if (!category)
    return res.status(404).json(new ErrorRes(404, "category not found"));
  return res.json(category);
};

export const addCategory = async (req: Request, res: Response) => {
  if (!req.file)
    return res.status(400).json(new ErrorRes(404, ["Image is required"]));

  const { error } = createCategorySchema.validate(req.body);
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

  const checkIfExists = await categorysService.getCategoryByTitle({
    title: req.body.title,
  });

  if (checkIfExists)
    return res.status(400).json(new ErrorRes(404, "Category already exists"));

  const category = await categorysService.addCategory(req.body, req.file);

  if (!category)
    return res.status(401).json(new ErrorRes(401, "Something went wrong"));

  return res
    .status(201)
    .json(new SuccessRes(201, "Category successfully created"));
};

export const deleteCategory = async (req: Request, res: Response) => {
  const category = await categorysService.deleteCategory(req.params.id);

  if (!category)
    return res.status(404).json(new ErrorRes(404, "Category not found"));

  return res.status(204).send();
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await categorysService.getById(req.params.id);
  if (!category)
    return res.status(404).json(new ErrorRes(404, "Category not found"));

  const { error } = updateCategoryShema.validate(req.body);
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

  const updatedCategory = await categorysService.updateCategory(
    req.body,
    req.params.id
  );

  return res
    .status(200)
    .json(new SuccessRes(200, "Category updated successfully !"));
};

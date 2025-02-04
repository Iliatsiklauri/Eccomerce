import { AppDataSource } from "../db/database-connect";
import { Category } from "../db/entities/Category";
import { categoryType, updateCategoryType } from "../utils/validation";
import { awsService } from "./aws.service";

export class categoryService {
  private categoryRepository = AppDataSource.getRepository(Category);
  private AWSService = new awsService();

  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (er) {
      throw console.log(er, "Failed to get categories");
    }
  }

  async getById(id) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      return category;
    } catch (er) {
      throw console.log(er, "Failed to get category");
    }
  }

  async getCategoryByTitle({ title }: { title: string }) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { title },
      });
      return category || null;
    } catch (er) {
      console.log(er);
      throw console.log(er, "Failed to fetch category");
    }
  }

  async addCategory(createCategory: categoryType, file: Express.Multer.File) {
    try {
      const [filePath, imageUrl] = await this.AWSService.uploadImage(
        file,
        "category"
      );
      const newCategory = await this.categoryRepository.create({
        ...createCategory,
        image: imageUrl,
        filepath: filePath,
      });
      const category = await this.categoryRepository.save(newCategory);
      return category;
    } catch (er) {
      throw console.log(er, "Failed to create category");
    }
  }

  async updateCategory(updateCategory: updateCategoryType, id) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (updateCategory.pinned !== undefined) {
        if (updateCategory.pinned === "true") {
          updateCategory.pinned = true;
        } else {
          updateCategory.pinned = false;
        }
      }
      Object.assign(category, updateCategory);
      return await this.categoryRepository.save(category);
    } catch (er) {
      console.log(er, "error while updating product");
    }
  }

  async deleteCategory(id) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) return null;
      await this.AWSService.deleteImage(category.filepath);
      await this.categoryRepository.delete({ id });
      return category;
    } catch (er) {
      throw console.log(er, "Failed to delete category");
    }
  }
}

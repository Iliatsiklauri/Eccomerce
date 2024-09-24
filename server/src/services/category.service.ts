import { AppDataSource } from "../db/database-connect";
import { Category } from "../db/entities/Category";
import { categoryType } from "../utils/validation";
import { awsService } from "./aws.service";

export class categoryService {
  private categoryRepository = AppDataSource.getRepository(Category);
  private AWSService = new awsService();

  async getAllCategories() {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (er) {
      throw new Error("Failed to get categories");
    }
  }

  async getById(id) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      return category;
    } catch (er) {
      throw new Error("Failed to get category");
    }
  }

  async getCategoryByTitle({ title }: { title: string }) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { title },
      });
      return category || null;
    } catch (er) {
      throw new Error("Failed to fetch category");
    }
  }

  async addCategory(createCategory: categoryType, file: Express.Multer.File) {
    try {
      const { filePath, imageUrl } = await this.AWSService.uploadImage(
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
      throw new Error("Failed to create category");
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
      throw new Error("Failed to delete category");
    }
  }
}

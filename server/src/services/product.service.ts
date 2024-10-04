import { AppDataSource } from "../db/database-connect";
import { Product } from "../db/entities/Product";
import {
  createProductDto,
  updateProductDto,
  updateProductFilesDto,
} from "../types/Product";
import { awsService } from "./aws.service";

export class productService {
  private readonly productRepository = AppDataSource.getRepository(Product);
  private AWSService = new awsService();

  async getAllProducts(
    skip: number,
    limit: number,
    category?: number,
    pinned?: boolean
  ): Promise<[Product[], number]> {
    try {
      const query = await this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .leftJoinAndSelect("product.category", "category");
      if (pinned) {
        query.orderBy("product.pinned", "DESC");
      }
      if (category) {
        query.where("category.id = :category", { category });
      }
      query.skip(skip).take(limit);
      const [products, total] = await query.getManyAndCount();
      return [products, total];
    } catch (er) {
      console.log(er, "error fetching products");
      return null;
    }
  }

  async getProductById(id): Promise<Product> {
    try {
      return await this.productRepository.findOne({
        where: { id },
        relations: ["comments", "comments.user", "category"],
      });
    } catch (er) {
      return null;
    }
  }

  async createProduct(createPostDto: createProductDto) {
    try {
      const [filepath, image] = await this.AWSService.uploadImage(
        createPostDto.image[0],
        "products"
      );
      const [pinnedImageFilePath, pinnedImage] =
        await this.AWSService.uploadImage(
          createPostDto.pinnedImage[0],
          "pinnedImages"
        );

      const createObject = {
        ...createPostDto,
        pinned: createPostDto.pinned === "true",
        image,
        filepath,
        pinnedImage,
        pinnedImageFilePath,
      };
      const newProduct = await this.productRepository.create(createObject);
      const Product = await this.productRepository.save(newProduct);
      return Product;
    } catch (er) {
      console.log(er);
      return null;
    }
  }

  async updateProduct(
    updateProductDto: updateProductDto,
    updateProductFilesDto: updateProductFilesDto,
    id
  ) {
    try {
      let target = await this.productRepository.findOneBy({ id });
      if (!target) return null;

      if (updateProductFilesDto.image) {
        await this.AWSService.deleteImage(target.filepath);
        const [filepath, image] = await this.AWSService.uploadImage(
          updateProductFilesDto.image[0],
          "products"
        );
        target = { ...target, filepath, image };
      }

      if (updateProductFilesDto.pinnedImage) {
        if (target.pinnedImage) {
          await this.AWSService.deleteImage(target.pinnedImageFilePath);
        }
        const [pinnedImageFilePath, pinnedImage] =
          await this.AWSService.uploadImage(
            updateProductFilesDto.pinnedImage[0],
            "pinnedImages"
          );
        target = {
          ...target,
          pinnedImage,
          pinnedImageFilePath,
        };
      }
      if (updateProductDto.pinned !== undefined) {
        updateProductDto.pinned =
          typeof updateProductDto.pinned === "string"
            ? updateProductDto.pinned === "true"
            : updateProductDto.pinned;
      }

      target = {
        ...target,
        ...updateProductDto,
      };

      await this.productRepository.save(target);
      return updateProductDto;
    } catch (er) {
      console.log(er, "error while updating product");
      return null;
    }
  }

  async deletePost(id) {
    try {
      const target = await this.productRepository.findOneBy({ id });
      if (!target) return null;
      await this.AWSService.deleteImage(target.filepath);
      if (target.pinnedImageFilePath) {
        await this.AWSService.deleteImage(target.pinnedImageFilePath);
      }
      const deletedProduct = await this.productRepository.delete({ id });
      if (deletedProduct.affected === 0) return null;
      return deletedProduct;
    } catch (er) {
      return null;
    }
  }
}

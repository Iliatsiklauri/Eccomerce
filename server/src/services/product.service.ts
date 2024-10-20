import { QueryBuilder } from "typeorm";
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
    pinned?: boolean,
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
    promotion?: boolean
  ): Promise<[Product[], number]> {
    try {
      const query = await this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .leftJoinAndSelect("product.category", "category");
      console.log(sort);
      if (pinned) {
        query.orderBy("product.pinned", "DESC");
      }
      if (category) {
        query.where("category.id = :category", { category });
      }
      if (minPrice) {
        query.andWhere("product.price >= :minPrice", { minPrice });
      }
      if (maxPrice) {
        query.andWhere("product.price <= :maxPrice", { maxPrice });
      }
      if (promotion) {
        query.andWhere("product.price > product.salePrice");
      }
      if (sort === "ASC") {
        query.addOrderBy("product.price", "ASC");
      } else if (sort === "DESC") {
        query.addOrderBy("product.price", "DESC");
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
  async searchProductBySearch(query) {
    try {
      const products = await this.productRepository
        .createQueryBuilder("product")
        .where("product.title ILIKE :query", { query: `%${query}%` })
        .orWhere("product.description ILIKE :query", { query: `%${query}%` })
        .orWhere("product.brand ILIKE :query", { query: `%${query}%` })
        .take(8)
        .getMany();
      return products;
    } catch (er) {
      return 400;
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
  ): Promise<Product | null | number | string> {
    try {
      let target = await this.productRepository.findOneBy({ id });
      if (!target) return 404;

      if (updateProductFilesDto.image) {
        if (updateProductDto.image) return "imageEr";
        await this.AWSService.deleteImage(target.filepath);
        const [filepath, image] = await this.AWSService.uploadImage(
          updateProductFilesDto.image[0],
          "products"
        );
        target = { ...target, filepath, image };
      }

      if (updateProductFilesDto.pinnedImage) {
        if (updateProductDto.pinnedImage) return "pinnedEr";
        if (target.pinnedImageFilePath) {
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
      return target;
    } catch (er) {
      console.log(er, "error while updating product");
      return null;
    }
  }

  async deletePost(id) {
    try {
      const target = await this.productRepository.findOneBy({ id });
      if (!target) return 404;

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

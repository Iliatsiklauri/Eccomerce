import { AppDataSource } from "../db/database-connect";
import { Product } from "../db/entities/Product";
import {
  createProductDto,
  updateProductDto,
  updateProductFilesDto,
} from "../types/Product";
import { awsService } from "./aws.service";

export class ProductService {
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
      if (pinned) {
        query.orderBy("product.pinned", "DESC");
      }
      if (category && category !== null) {
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
        query.addOrderBy("product.salePrice", "ASC");
      } else if (sort === "DESC") {
        query.addOrderBy("product.salePrice", "DESC");
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
      console.log(er, "Error while getting single product");
      return null;
    }
  }

  async searchProductBySearch(query) {
    try {
      const products = await this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.category", "category")
        .where("product.title ILIKE :query", { query: `%${query}%` })
        .orWhere("product.description ILIKE :query", { query: `%${query}%` })
        .orWhere("product.brand ILIKE :query", { query: `%${query}%` })
        .orWhere("category.title ILIKE :query", { query: `%${query}%` })
        .take(8)
        .getMany();
      return products;
    } catch (er) {
      console.log(er, "Error while searching for products");
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
      console.log(er, "Error while creating product");
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

      if (updateProductFilesDto.image) {
        const [filepath, image] = await this.AWSService.uploadImage(
          updateProductFilesDto.image[0],
          "products"
        );
        target = { ...target, filepath, image };
      }

      if (updateProductFilesDto.pinnedImage) {
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
      console.log(er, "Error while updating product");
      return null;
    }
  }

  async updateProductInStock(id, number) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      product.inStock = product.inStock - number;
      await this.productRepository.save(product);
    } catch (er) {
      console.log(er, "Error while updating product inStock property");
    }
  }

  async deletePost(id) {
    try {
      const deletedProduct = await this.productRepository.delete({ id });
      if (deletedProduct.affected === 0) return null;

      return deletedProduct;
    } catch (er) {
      console.log(er, "Error while deleting product");
      return null;
    }
  }
}

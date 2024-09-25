import { AppDataSource } from "../db/database-connect";
import { Product } from "../db/entities/Product";
import { productType } from "../utils/validation";
import { awsService } from "./aws.service";

export class productService {
  private readonly productRepository = AppDataSource.getRepository(Product);
  private AWSService = new awsService();

  async getAllProducts(
    skip: number,
    limit: number,
    category?: number
  ): Promise<[Product[], number]> {
    try {
      const query = await this.productRepository
        .createQueryBuilder("product")
        .skip(skip)
        .limit(limit)
        .leftJoinAndSelect("product.comments", "comments")
        .leftJoinAndSelect("comments.user", "user")
        .leftJoinAndSelect("product.category", "category");
      if (category) {
        query.where("category.id = :category", { category });
      }
      const [products, total] = await query.getManyAndCount();
      return [products, total];
    } catch (er) {
      console.log(er);
      return null;
    }
  }

  async getProductById(id): Promise<Product> {
    try {
      return await this.productRepository.findOne({
        where: { id },
        relations: ["comments", "comments.user"],
      });
    } catch (er) {
      return null;
    }
  }

  async createProduct(createPostDto: productType, file: Express.Multer.File) {
    try {
      const { filePath, imageUrl } = await this.AWSService.uploadImage(
        file,
        "products"
      );
      const newProduct = await this.productRepository.create({
        ...createPostDto,
        image: imageUrl,
        filepath: filePath,
      });
      const Product = await this.productRepository.save(newProduct);
      return Product;
    } catch (er) {
      return null;
    }
  }

  async updatePost(updateProductDto, id) {
    try {
      let target = await this.productRepository.findOneBy({ id });
      if (!target) return null;
      if (updateProductDto.image) {
        await this.AWSService.deleteImage(target.filepath);
        const { filePath, imageUrl } = await this.AWSService.uploadImage(
          updateProductDto.image,
          "/products"
        );
        target = { ...target, filepath: filePath, image: imageUrl };
      }
      const {
        title,
        description,
        price,
        pinned,
        category,
        salePrice,
        inStock,
      } = updateProductDto;
      target = {
        ...target,
        title,
        description,
        price,
        pinned,
        category,
        salePrice,
        inStock,
      };
      await this.productRepository.save(target);
      return updateProductDto;
    } catch (er) {
      return null;
    }
  }

  async deletePost(id) {
    try {
      const target = await this.productRepository.findOneBy({ id });
      if (!target) return null;
      await this.AWSService.deleteImage(target.filepath);
      const deletedProduct = await this.productRepository.delete({ id });
      if (deletedProduct.affected === 0) return null;
      return deletedProduct;
    } catch (er) {
      return null;
    }
  }
}

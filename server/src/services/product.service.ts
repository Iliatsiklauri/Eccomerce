import { AppDataSource } from "../db/database-connect";
import { Product } from "../db/entity/Product";
import { productType } from "../utils/validation";
import { awsService } from "./aws.service";

export class productService {
  private readonly productRepository = AppDataSource.getRepository(Product);
  private AWSService = new awsService();

  async getAllProducts(
    skip: number,
    limit: number
  ): Promise<[Product[], number]> {
    return await this.productRepository.findAndCount({
      skip,
      take: limit,
      relations: ["comments", "comments.user", "category"],
    });
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
      const { title, description, price, pinned, category } = updateProductDto;
      target = { ...target, title, description, price, pinned, category };
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

import { AppDataSource } from "../db/database-connect";
import { Comment } from "../db/entity/Comment";
import { productService } from "./product.service";
import { UserService } from "./user.service";

export class commentService {
  private readonly commentRepository = AppDataSource.getRepository(Comment);
  private usersService = new UserService();
  private productsService = new productService();

  async getComments() {
    try {
      return await this.commentRepository.find({
        relations: ["product", "user"],
      });
    } catch (er) {
      return null;
    }
  }

  async getSingleComment(id) {
    try {
      const comment = await this.commentRepository.findOneBy({ id });
      if (!comment) return null;
      return comment;
    } catch (er) {
      return null;
    }
  }

  async addComment(id, email, content) {
    try {
      const product = await this.productsService.getProductById(id);
      const user = await this.usersService.getUserByEmail(email);
      if (!user || !product) {
        return null;
      }
      const comment = new Comment();
      comment.content = content;
      comment.user = user;
      comment.product = product;
      return await this.commentRepository.save(comment);
    } catch (er) {
      return null;
    }
  }

  async deleteComment(id) {
    try {
      await this.commentRepository.delete({ id });
    } catch (er) {
      return null;
    }
  }
  async updateComment(id, content) {
    try {
      const target = await this.commentRepository.findOneBy({ id });
      target.content = content;
      await this.commentRepository.save(target);
      return target;
    } catch (er) {
      return null;
    }
  }
}

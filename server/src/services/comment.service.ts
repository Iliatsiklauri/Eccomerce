import { AppDataSource } from "../db/database-connect";
import { Comment } from "../db/entities/Comment";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";

export class commentService {
  private readonly commentRepository = AppDataSource.getRepository(Comment);
  private usersService = new UserService();
  private productsService = new ProductService();

  async getComments() {
    try {
      return await this.commentRepository.find({
        relations: ["product", "user"],
      });
    } catch (er) {
      console.log(er, "Error while getting all comments");
      return null;
    }
  }

  async getSingleComment(id) {
    try {
      const comment = await this.commentRepository.findOneBy({ id });
      if (!comment) return null;
      return comment;
    } catch (er) {
      console.log(er, "Error while getting single comment");
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
      console.log(er, "Error while adding comment");
      return null;
    }
  }

  async deleteComment(id) {
    try {
      const comment = await this.commentRepository.delete({ id });
      if (comment.affected === 0) return null;
      return comment;
    } catch (er) {
      console.log(er, "Error while deleting single comment");
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
      console.log(er, "Error while updating single comment");
      return null;
    }
  }
}

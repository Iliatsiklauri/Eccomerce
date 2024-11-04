import { AppDataSource } from "../db/database-connect";
import { Cart } from "../db/entities/Cart";
import { Product } from "../db/entities/Product";
import { User } from "../db/entities/User";
import { userType } from "../utils/validation";
import { productService } from "./product.service";
import { UserService } from "./user.service";

export class cartService {
  private readonly cartRepository = AppDataSource.getRepository(Cart);
  private UsersService = new UserService();
  private ProductsService = new productService();

  async getAllCart() {
    try {
      const carts = await this.cartRepository.find({
        relations: ["user", "products"],
      });
      return carts;
    } catch (er) {
      console.log(er, "error while fetching all carts");
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.cartRepository.findOne({
        where: { user: { id } },
        relations: { products: true },
      });

      if (!cart) return null;
      return cart;
    } catch (er) {
      console.log(er, "error while fetching single cart");
    }
  }

  async addItemToCart(product: Product, user: userType) {
    try {
      const targetUser = await this.UsersService.getUserById(user.id);
      let cart = await this.getCartById(user.id);

      if (!cart) {
        cart = new Cart();
        cart.user = targetUser;
        cart.products = [];
      } else {
        cart.products = cart.products || [];
      }

      const productExists = cart.products.some(
        (el: Product) => el.id === product.id
      );
      if (productExists) return cart;

      if (cart) cart.products.push(product);
      await this.cartRepository.save(cart);

      return cart;
    } catch (er) {
      console.log(er, "error while adding item to cart");
      return null;
    }
  }

  async removeItemFromCart(id, user) {
    try {
      const cart = await this.getCartById(user.id);
      if (!cart) return null;

      const productExists = cart.products.some(
        (el: Product) => el.id === Number(id)
      );
      if (!productExists) return null;

      const newProducts = cart.products.filter(
        (el: Product) => el.id !== Number(id)
      );

      cart.products = newProducts;
      await this.cartRepository.save(cart);

      return cart;
    } catch (er) {
      console.log(er, "error while removing item from cart");
      return null;
    }
  }
}

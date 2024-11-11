import { AppDataSource } from "../db/database-connect";
import { CartItem } from "../db/entities/CartItem";
import { Product } from "../db/entities/Product";
import { User } from "../db/entities/User";

export class CartItemService {
  private CartItemRepository = AppDataSource.getRepository(CartItem);

  async getAll() {
    try {
      const cartItems = await this.CartItemRepository.find({
        relations: { user: true, product: true },
      });
      return cartItems;
    } catch (er) {
      console.log(er, "Error while fetching all products");
    }
  }

  async getCartItemById(id: number) {
    try {
      const cartItem = await this.CartItemRepository.findOne({
        where: { id },
        relations: { user: true, product: true },
      });

      return cartItem;
    } catch (er) {
      console.log(er, "Error while fetching single cart item");
    }
  }

  async getWholeCartByUserId(id: number) {
    const cart = await this.CartItemRepository.find({
      where: { user: { id } },
      relations: ["product", "user"],
    });
    return cart;
  }

  async addCartItem(product: Product, user: User, quantity: number) {
    try {
      const checkIfExists = await this.CartItemRepository.findOne({
        where: { user: { id: user.id }, product: { id: product.id } },
      });

      if (checkIfExists) return 400;

      const cartItem = new CartItem();
      cartItem.user = user;
      cartItem.product = product;
      cartItem.quantity = quantity;

      await this.CartItemRepository.save(cartItem);
      return cartItem;
    } catch (er) {
      console.log(er, "Error while adding cart item");
    }
  }

  async updateCartItem(id, quantity) {
    const cartItem = await this.CartItemRepository.findOne({ where: { id } });

    if (!cartItem) return null;
    cartItem.quantity = quantity;

    await this.CartItemRepository.save(cartItem);
    return cartItem;
  }

  async removeCartItem(id) {
    try {
      const deletedCartItem = await this.CartItemRepository.delete({ id });
      if (deletedCartItem.affected === 0) return null;
      return deletedCartItem;
    } catch (er) {
      console.log(er, "Error while deleting cartItem");
    }
  }
}

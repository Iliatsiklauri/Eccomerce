import { AppDataSource } from "../db/database-connect";
import { CartItem } from "../db/entities/CartItem";
import { Order } from "../db/entities/Order";
import { Product } from "../db/entities/Product";
import { User } from "../db/entities/User";
import { OrderItemType } from "../types/Product";

export class OrderService {
  private readonly orderRepository = AppDataSource.getRepository(Order);

  async getAllOrders() {
    try {
      const orders = await this.orderRepository.find({
        relations: { user: true },
      });
      return orders;
    } catch (er) {
      console.log(er, "Error while fetching all orders");
    }
  }

  async getUserOrders(userId) {
    try {
      const orders = await this.orderRepository.find({
        where: { user: { id: userId } },
      });
      return orders;
    } catch (er) {
      console.log(er, "Error while fetching all orders");
    }
  }

  async addOrderBycart(cartItems: CartItem[], user: User) {
    try {
      const order = new Order();

      order.products = [];
      cartItems.forEach((CartItem: CartItem) => {
        order.products.push(CartItem);
      });
      order.address = user.Address;
      order.user = user;

      const savedOrder = await this.orderRepository.save(order);
      if (!savedOrder) return null;

      return savedOrder;
    } catch (er) {
      console.log(er, "Error while creating product");
    }
  }

  async addOrder(products: OrderItemType[], user: User, quantity) {
    try {
      const order = new Order();

      products[0].quantity = quantity;
      order.address = user.Address;
      order.products = products;
      order.user = user;

      const savedOrder = await this.orderRepository.save(order);
      if (!savedOrder) return null;

      return savedOrder;
    } catch (er) {
      console.log(er, "Error while creating product");
    }
  }

  async deleteOrder(id) {
    try {
      const deletedTarget = await this.orderRepository.delete(id);
      if (deletedTarget.affected === 0) return null;
      return deletedTarget;
    } catch (er) {
      console.log(er, "Error while deleting Order");
    }
  }
}

import { AppDataSource } from "../db/database-connect";
import { CartItem } from "../db/entities/CartItem";
import { Order, orderStatus } from "../db/entities/Order";
import { User } from "../db/entities/User";

export class OrderService {
  private readonly orderRepository = AppDataSource.getRepository(Order);

  async getAllOrders(skip: number, limit: number, status: string | null) {
    try {
      const query = await this.orderRepository
        .createQueryBuilder("order")
        .leftJoinAndSelect("order.user", "user")
        .orderBy("order.createdAt", "DESC");
      if (status) {
        query.andWhere("order.orderStatus = :status", { status });
      }

      query.skip(skip).take(limit);

      const [products, total] = await query.getManyAndCount();

      return [products, total];
    } catch (er) {
      console.log(er, "Error while fetching all orders");
    }
  }

  async getUserOrders(userId) {
    try {
      const orders = await this.orderRepository.find({
        where: { user: { id: userId } },
        order: { createdAt: "ASC" },
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

  async addOrder(product: CartItem, user: User, quantity) {
    try {
      const order = new Order();
      order.products = [];
      order.address = user.Address;
      order.products.push(product);
      order.user = user;

      const savedOrder = await this.orderRepository.save(order);
      if (!savedOrder) return null;

      return savedOrder;
    } catch (er) {
      console.log(er, "Error while creating product");
    }
  }

  async updateOrder(id: number, status: orderStatus) {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) return null;
      order.orderStatus = status;

      const updated = await this.orderRepository.save(order);
      return updated;
    } catch (e) {
      console.log(e, "Error while updating order status");
      return null;
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

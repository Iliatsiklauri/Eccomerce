import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./Address";
import { CartItem } from "./CartItem";
import { Order } from "./Order";

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @OneToOne(() => Address, { cascade: true, onDelete: "SET NULL" })
  @JoinColumn()
  Address: Address;

  @Column({ select: false })
  password: string;

  @Column({
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  initialAdmin: boolean;

  @OneToMany(() => CartItem, (CartItem) => CartItem.user)
  cartItems: CartItem[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

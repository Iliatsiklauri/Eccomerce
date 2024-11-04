import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @OneToOne(() => User, (User) => User.cart)
  user: User;
}

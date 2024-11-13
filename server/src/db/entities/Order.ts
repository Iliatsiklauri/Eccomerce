import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum orderStatus {
  PENDING = "pending",
  FAILED = "failed",
  FULLFILED = "fullfiled",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  user: User;

  @Column("json")
  products: object[];

  @Column("json")
  address: object;

  @Column({ type: "enum", enum: orderStatus, default: orderStatus.PENDING })
  orderStatus: orderStatus;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}

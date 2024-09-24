import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  salePrice: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({ default: "" })
  filepath: string;

  @ManyToOne(() => Category, {
    nullable: false,
  })
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ default: false })
  categoryId: number;

  @Column({ default: false })
  pinned: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[];
}

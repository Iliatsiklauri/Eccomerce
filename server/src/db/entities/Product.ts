import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
  Collection,
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

  @Column({ type: "float" })
  salePrice: number;

  @Column({ type: "float" })
  price: number;

  @Column()
  image: string;

  @Column({ nullable: true })
  pinnedImage: string;

  @Column({ nullable: true })
  pinnedImageFilePath: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ default: "" })
  filepath: string;

  @ManyToOne(() => Category, { nullable: false })
  category: Category;

  @Column({ default: false })
  pinned: boolean;

  @Column({ default: 1 })
  inStock: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Comment, (comment) => comment.product, { cascade: true })
  comments: Comment[];
}

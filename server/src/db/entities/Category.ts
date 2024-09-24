import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  pinned: boolean;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column({ default: "" })
  link: string;

  @Column({ default: "" })
  filepath: string;
}

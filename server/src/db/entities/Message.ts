import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  senderId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "senderId" })
  sender: User;

  @Column({ nullable: true })
  recieverId: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "recieverId" })
  reciever: User;

  @CreateDateColumn()
  createdAt: Date;
}

export type sendMessageDto = {
  content: string;
  sender: number | null;
  reciever: number | null;
};

import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  password: string;

  @Column({
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  initialAdmin: boolean;
}

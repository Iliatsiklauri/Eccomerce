import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  additionalInfo: string;

  @Column()
  street: string;

  @Column({ type: "float" })
  lat: number;

  @Column({ type: "float" })
  lng: number;
}

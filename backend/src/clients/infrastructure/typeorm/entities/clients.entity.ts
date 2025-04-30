import {
  ClientsModel,
  RolesProps,
} from "@/clients/domain/models/clients.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./Address";
import { Contact } from "./Contact";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";

@Entity("clients")
export class Client implements ClientsModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  cpf: string;

  @Column("text")
  name: string;

  @Column("text")
  surname: string;

  @Column({ type: "date" })
  dateOfBirth: Date;

  @Column(() => Address)
  address: Address;

  @Column(() => Contact)
  contact: Contact;

  @Column(() => Address)
  billingAddress: Address;

  @OneToMany(() => Scheduling, (scheduling) => scheduling.client)
  scheduling: Scheduling[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  UserModel,
  StatusPermission,
} from "../../../domain/models/users.model";
import { Consultation } from "@/consultation/infrastructure/typeorm/entities/consultation.entity";
import { nullable } from "zod";

@Entity("users")
export class User implements UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: StatusPermission })
  roles: StatusPermission;

  @OneToMany(() => Consultation, (consultation) => consultation.professional, {
    nullable: false,
  })
  consultation: Consultation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

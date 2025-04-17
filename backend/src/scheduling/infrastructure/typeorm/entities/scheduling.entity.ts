import { Client } from "@/clients/infrastructure/typeorm/entities/clients.entity";
import { Consultation } from "@/consultation/infrastructure/typeorm/entities/consultation.entity";
import { SchedulingModel } from "@/scheduling/domain/models/scheduling.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Index(["date", "time"], { unique: true }) // Essa linha não deixa ter dois dados com a mesma hora e data
@Entity("schedulings")
export class Scheduling implements SchedulingModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  time: Date;

  @Column("text")
  observations: string;

  @ManyToOne(() => Client, (client) => client.scheduling, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "client_id" })
  client: Client;

  @OneToOne(() => Consultation, (consultation) => consultation.scheduling, {
    nullable: false,
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "consultation_id" }) // Aqui a FK fica em `schedulings`
  consultation: Consultation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

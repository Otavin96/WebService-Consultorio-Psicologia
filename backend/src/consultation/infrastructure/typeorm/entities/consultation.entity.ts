import {
  ConsultationModel,
  Status,
} from "@/consultation/domain/models/consultation.model";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("consultations")
export class Consultation implements ConsultationModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  time: Date;

  @Column({ type: "enum", enum: Status })
  situation: Status;

  @Column("text")
  prevConsultation: string;

  @Column("text")
  currentQuery: string;

  @Column("text")
  patientAttention: string;

  @OneToOne(() => Scheduling, (scheduling) => scheduling.consultation, {
    cascade: ["insert", "update"],
    onDelete: "CASCADE",
    nullable: false,
  })
  scheduling: Scheduling;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

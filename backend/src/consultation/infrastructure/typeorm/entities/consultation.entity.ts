import {
  ConsultationModel,
  Status,
} from "@/consultation/domain/models/consultation.model";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { User } from "@/users/infrastructure/typeorm/entities/users.entitty";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("consultations")
export class Consultation implements ConsultationModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: Status })
  situation: Status;

  @Column({ type: "jsonb", nullable: true })
  previousConsultations: { date: string; note: string }[];

  @Column("text")
  currentQuery: string;

  @Column("text")
  patientAttention: string;

  @OneToOne(() => Scheduling, (scheduling) => scheduling.consultation, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scheduling_id" })
  scheduling: Scheduling;

  @ManyToOne(() => User, (user) => user.consultation, { nullable: false })
  @JoinColumn({ name: "professional" })
  professional: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { ClientsModel, RolesProps } from "@/clients/domain/models/clients.model";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Address } from "./Address";
import { Contact } from "./Contact";


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

    @Column({ type: 'timestamp'})
    dateOfBirth: Date;

    @Column(() => Address)
    address: Address;
    
    @Column(() => Contact)
    contact: Contact;

    @Column({ type: "enum", enum: RolesProps })
    roles: RolesProps;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
import { Column } from "typeorm";

export class Contact {

    @Column("text")
    phone: string;

    @Column("text")
    whatsApp: string;

    @Column("text")
    email: string;
  };
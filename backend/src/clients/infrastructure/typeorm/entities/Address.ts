import { Column } from "typeorm";
export class Address {
  @Column("text")
  cep: string;

  @Column("text")
  publicPlace: string;

  @Column("text")
  numberHouse: number;

  @Column("text")
  neighborhood: string;

  @Column("text")
  state: string;

  @Column("text")
  city: string;
}

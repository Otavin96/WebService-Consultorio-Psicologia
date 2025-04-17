import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ClientsModel, RolesProps } from "../domain/models/clients.model";
import { Contact } from "../infrastructure/typeorm/entities/Contact";
import { Scheduling } from "@/scheduling/infrastructure/typeorm/entities/scheduling.entity";
import { Address } from "../infrastructure/typeorm/entities/Address";

export type CreateClientsProps = {
  cpf: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: Address;
  contact: Contact;
  roles: RolesProps;
};

export interface ClientsRepository
  extends RepositoryInterface<ClientsModel, CreateClientsProps> {
  conflictingCPF(cpf: string): Promise<void>;
}

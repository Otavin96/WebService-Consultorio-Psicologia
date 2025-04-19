import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";
import { ClientsOutput, RolesProps } from "../dtos/clients-output.dto";
import { inject, injectable } from "tsyringe";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { Address } from "@/clients/infrastructure/typeorm/entities/Address";

export namespace UpdateClientUseCase {
  export type Input = {
    id: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    address: Address;
    contact: Contact;
    roles: RolesProps;
  };

  export type Output = ClientsOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientsRepository") private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let client = await this.clientsRepository.findById(input.id);

      if (input.name) {
        client.name = input.name;
      }

      if (input.surname) {
        client.surname = input.surname;
      }

      if (input.contact?.phone) {
        client.contact.phone = input.contact.phone;
      }

      if (input.contact?.whatsApp) {
        client.contact.whatsApp = input.contact.whatsApp;
      }

      if (input.contact?.email) {
        client.contact.email = input.contact.email;
      }

      if (input.address?.cep) {
        client.address.cep = input.address.cep;
      }

      if (input.address?.publicPlace) {
        client.address.publicPlace = input.address.publicPlace;
      }

      if (input.address?.numberHouse) {
        client.address.numberHouse = input.address.numberHouse;
      }

      if (input.address?.neighborhood) {
        client.address.neighborhood = input.address.neighborhood;
      }

      if (input.address?.state) {
        client.address.state = input.address.state;
      }

      if (input.address?.city) {
        client.address.city = input.address.city;
      }

      if (input.dateOfBirth) {
        client.dateOfBirth = input.dateOfBirth;
      }

      if (input.roles) {
        client.roles = input.roles;
      }

      const updatedClient: ClientsOutput =
        await this.clientsRepository.update(client);

      return updatedClient;
    }
  }
}

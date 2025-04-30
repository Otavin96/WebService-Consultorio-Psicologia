import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";
import { ClientsOutput } from "../dtos/clients-output.dto";
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
    billingAddress: Address;
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

      if (input.dateOfBirth) {
        client.dateOfBirth = input.dateOfBirth;
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

      if (input.billingAddress?.cep) {
        client.billingAddress.cep = input.billingAddress.cep;
      }

      if (input.billingAddress?.publicPlace) {
        client.billingAddress.publicPlace = input.billingAddress.publicPlace;
      }

      if (input.billingAddress?.numberHouse) {
        client.billingAddress.numberHouse = input.billingAddress.numberHouse;
      }

      if (input.billingAddress?.neighborhood) {
        client.billingAddress.neighborhood = input.billingAddress.neighborhood;
      }

      if (input.billingAddress?.state) {
        client.billingAddress.state = input.billingAddress.state;
      }

      if (input.billingAddress?.city) {
        client.billingAddress.city = input.billingAddress.city;
      }

      const updatedClient: ClientsOutput =
        await this.clientsRepository.update(client);

      return updatedClient;
    }
  }
}

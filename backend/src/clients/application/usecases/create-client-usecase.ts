import { Address } from "@/clients/infrastructure/typeorm/entities/Address";
import { Contact } from "@/clients/infrastructure/typeorm/entities/Contact";
import { ClientsOutput, RolesProps } from "../dtos/clients-output.dto";
import { inject, injectable } from "tsyringe";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { BadRequestError } from "@/common/domain/errors/badRequest-error";

export namespace CreateClientUseCase {
  export type Input = {
    cpf: string;
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
      if (
        !input.cpf ||
        !input.name ||
        !input.surname ||
        !input.address ||
        !input.dateOfBirth ||
        !input.contact ||
        !input.roles
      ) {
        throw new BadRequestError("Input data not provedid or invalid");
      }

      await this.clientsRepository.conflictingCPF(input.cpf);

      const client = this.clientsRepository.create(input);

      const createClient: ClientsOutput =
        await this.clientsRepository.insert(client);

      return createClient;
    }
  }
}

import { CreateClientUseCase } from "@/clients/application/usecases/create-client-usecase";
import { RolesProps } from "@/clients/domain/models/clients.model";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateClientController(
  request: Request,
  response: Response
) {
  // Contact schema
  const ContactSchema = z.object({
    phone: z.string(),
    whatsApp: z.string(),
    email: z.string().email(),
  });

  // Address schema
  const AddressSchema = z.object({
    cep: z.string(),
    publicPlace: z.string(),
    numberHouse: z.number(),
    neighborhood: z.string(),
    state: z.string(),
    city: z.string(),
  });

  // Client schema
  const CreateClientSchemaBody = z.object({
    cpf: z.string(),
    name: z.string(),
    surname: z.string(),
    dateOfBirth: z.coerce.date(), // aceita string ou Date
    roles: z.nativeEnum(RolesProps),
    contact: ContactSchema,
    address: AddressSchema,
  });

  const { cpf, name, surname, dateOfBirth, roles, contact, address } =
    dataValidation(CreateClientSchemaBody, request.body);

  const createClientUseCase: CreateClientUseCase.UseCase = container.resolve(
    "CreateClientsUseCase"
  );

  const client = await createClientUseCase.execute({
    cpf,
    name,
    surname,
    dateOfBirth,
    roles,
    contact,
    address,
  });

  response.status(201).json(client);
}

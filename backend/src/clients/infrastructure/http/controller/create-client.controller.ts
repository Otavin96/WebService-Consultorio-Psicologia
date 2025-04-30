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
    phone: z.string().min(1, "Telefone obrigatório"),
    whatsApp: z.string().min(1, "O numero do Whatsapp é obrigatório"),
    email: z.string().email("E-mail inválido"),
  });

  // Address schema
  const AddressSchema = z.object({
    cep: z.string().min(1, "CEP obrigatório"),
    publicPlace: z.string().min(1, "Logradouro obrigatório"),
    numberHouse: z.coerce.string(),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    state: z.string().min(1, "Estado obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
  });

  // Client schema
  const CreateClientSchemaBody = z.object({
    cpf: z.string().min(1, "CPF obrigatório"),
    name: z.string().min(1, "Nome obrigatório"),
    surname: z.string().min(1, "Sobrenome obrigatório"),
    dateOfBirth: z.coerce.date(),
    contact: ContactSchema,
    address: AddressSchema,
    billingAddress: z.lazy(() => AddressSchema),
  });

  const { cpf, name, surname, dateOfBirth, contact, address, billingAddress } =
    dataValidation(CreateClientSchemaBody, request.body);

  const createClientUseCase: CreateClientUseCase.UseCase = container.resolve(
    "CreateClientsUseCase"
  );

  const client = await createClientUseCase.execute({
    cpf,
    name,
    surname,
    dateOfBirth,
    contact,
    address,
    billingAddress,
  });

  response.status(201).json(client);
}

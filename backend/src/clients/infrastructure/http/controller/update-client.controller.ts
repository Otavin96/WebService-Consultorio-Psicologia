import { UpdateClientUseCase } from "@/clients/application/usecases/update-client-usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateClientController(
  request: Request,
  response: Response
) {
  const GetClientSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(GetClientSchemaParams, request.params);

  // Contact schema
  const ContactSchema = z.object({
    phone: z.string().optional(),
    whatsApp: z.string().optional(),
    email: z.string().email().optional(),
  });

  // Address schema
  const AddressSchema = z.object({
    cep: z.string().optional(),
    publicPlace: z.string().optional(),
    numberHouse: z.coerce.string().optional(),
    neighborhood: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
  });

  // Client schema
  const UpdateClientSchemaBody = z
    .object({
      name: z.string().optional(),
      surname: z.string().optional(),
      dateOfBirth: z.coerce.date().optional(), // aceita string ou Date
      billingAddress: z.lazy(() => AddressSchema).optional(),
      contact: ContactSchema.optional().refine(
        (val) => val === undefined || Object.keys(val).length > 0,
        {
          message:
            "Se o campo 'Contato' for enviado, ele não pode estar vazio.",
        }
      ),
      address: AddressSchema.optional().refine(
        (val) => val === undefined || Object.keys(val).length > 0,
        {
          message:
            "Se o campo 'Endereço' for enviado, ele não pode estar vazio.",
        }
      ),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "Pelo menos um campo deve ser fornecido para atualização.",
    });

  const { name, surname, dateOfBirth, contact, address, billingAddress } =
    dataValidation(UpdateClientSchemaBody, request.body);

  const updateClientUseCase: UpdateClientUseCase.UseCase = container.resolve(
    "UpdateClientsUseCase"
  );

  const client = await updateClientUseCase.execute({
    id,
    name,
    surname,
    dateOfBirth,
    contact,
    address,
    billingAddress,
  });

  response.status(201).json(client);
}

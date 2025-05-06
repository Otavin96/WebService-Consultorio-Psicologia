import { dataValidation } from "@/common/infrastructure/validation/zod";
import { CreateSchedulingUseCase } from "@/scheduling/application/usecases/create-scheduling-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateSchedulingController(
  request: Request,
  response: Response
) {
  const CreateSchedulingSchemaBody = z.object({
    client: z.object({
      id: z.string(),
      cpf: z.string(),
      name: z.string(),
      surname: z.string(),
      dateOfBirth: z.coerce.date(),
      address: z.object({
        cep: z.string().min(1, "CEP obrigatório"),
        publicPlace: z.string().min(1, "Logradouro obrigatório"),
        numberHouse: z.string(),
        neighborhood: z.string().min(1, "Bairro obrigatório"),
        state: z.string().min(1, "Estado obrigatório"),
        city: z.string().min(1, "Cidade obrigatória"),
      }),
      contact: z.object({
        phone: z.string().min(1, "Telefone obrigatório"),
        whatsApp: z.string().optional(),
        email: z.string().email("E-mail inválido"),
      }),
    }),
    date: z.coerce.date(),
    time: z.string().time(),
    observations: z.string(),
  });

  const { client, date, time, observations } = dataValidation(
    CreateSchedulingSchemaBody,
    request.body
  );

  const createSchedulingUseCase: CreateSchedulingUseCase.UseCase =
    container.resolve("CreateSchedulingsUseCase");

  const scheduling = await createSchedulingUseCase.execute({
    client,
    date,
    time,
    observations,
  });

  response.status(201).json(scheduling);
}

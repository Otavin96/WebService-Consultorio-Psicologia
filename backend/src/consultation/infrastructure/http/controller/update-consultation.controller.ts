import { dataValidation } from "@/common/infrastructure/validation/zod";
import { UpdateConsutationUseCase } from "@/consultation/application/usecases/update-consultation-usecase";
import { Status } from "@/consultation/domain/models/consultation.model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateConsultationController(
  request: Request,
  response: Response
) {
  const GetConsultationSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(GetConsultationSchemaParams, request.params);

  const UpdateClientSchemaBody = z.object({
    situation: z.nativeEnum(Status).optional(),
    previousConsultations: z
      .object({
        date: z.string(),
        note: z.string(),
      })
      .optional(),
    currentQuery: z.string().optional(),
    patientAttention: z.string().optional(),
    scheduling: z.string().optional(),
  });

  const {
    situation,
    previousConsultations,
    currentQuery,
    patientAttention,
    scheduling,
  } = dataValidation(UpdateClientSchemaBody, request.body);

  const updateConsutationUseCase: UpdateConsutationUseCase.UseCase =
    container.resolve("UpdateClientsUseCase");

  const consultation = await updateConsutationUseCase.execute({
    id,
    situation,
    previousConsultations,
    currentQuery,
    patientAttention,
    scheduling,
  });

  response.status(201).json(consultation);
}

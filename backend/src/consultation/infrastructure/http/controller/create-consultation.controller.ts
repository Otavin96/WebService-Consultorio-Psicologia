import { dataValidation } from "@/common/infrastructure/validation/zod";
import { CreateConsultationUseCase } from "@/consultation/application/usecases/create-consultation-usecase";
import { Status } from "@/consultation/domain/models/consultation.model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function CreateConsultationController(
  request: Request,
  response: Response
) {
  const CreateConsultationSchemaBody = z.object({
    situation: z.nativeEnum(Status),
    previousConsultations: z.object({
      date: z.string(),
      note: z.string(),
    }),
    currentQuery: z.string(),
    patientAttention: z.string(),
    scheduling: z.string(),
    professional: z.string(),
  });

  const {
    situation,
    previousConsultations,
    currentQuery,
    patientAttention,
    scheduling,
    professional,
  } = dataValidation(CreateConsultationSchemaBody, request.body);

  const createConsultationUseCase: CreateConsultationUseCase.UseCase =
    container.resolve("CreateConsultationsUseCase");

  const consutation = await createConsultationUseCase.execute({
    situation,
    previousConsultations,
    currentQuery,
    patientAttention,
    scheduling,
    professional,
  });

  response.status(201).json(consutation);
}

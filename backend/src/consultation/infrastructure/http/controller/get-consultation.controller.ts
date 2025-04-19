import { dataValidation } from "@/common/infrastructure/validation/zod";
import { GetConsultationUseCase } from "@/consultation/application/usecases/get-consultation.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetConsultationController(
  request: Request,
  response: Response
) {
  const GetConsultationSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(GetConsultationSchemaParams, request.params);

  const getConsultationUseCase: GetConsultationUseCase.UseCase =
    container.resolve("GetConsultationsUseCase");

  const consultation = await getConsultationUseCase.execute({ id });

  response.status(200).json(consultation);
}

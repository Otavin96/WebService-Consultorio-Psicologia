import { dataValidation } from "@/common/infrastructure/validation/zod";
import { DeleteConsultationUseCase } from "@/consultation/application/usecases/delete-consultation.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function DeleteConsultationController(
  request: Request,
  response: Response
) {
  const DeleteConsultationSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(DeleteConsultationSchemaParams, request.params);

  const deleteConsultationsUseCase: DeleteConsultationUseCase.UseCase =
    container.resolve("DeleteConsultationsUseCase");

  await deleteConsultationsUseCase.execute({ id });

  response.status(200).json({ message: "Consulta deletada com sucesso!" });
}

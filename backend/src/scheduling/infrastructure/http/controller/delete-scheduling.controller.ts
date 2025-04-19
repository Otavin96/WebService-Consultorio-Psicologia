import { dataValidation } from "@/common/infrastructure/validation/zod";
import { DeleteSchedulingUseCase } from "@/scheduling/application/usecases/delete-scheduling.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function DeleteSchedulingController(
  request: Request,
  response: Response
) {
  const DeleteSchedulingSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(DeleteSchedulingSchemaParams, request.params);

  const deleteSchedulingsUseCase: DeleteSchedulingUseCase.UseCase =
    container.resolve("DeleteSchedulingsUseCase");

  await deleteSchedulingsUseCase.execute({ id });

  response.status(200).json({ message: "Agendamento deletado com sucesso!" });
}

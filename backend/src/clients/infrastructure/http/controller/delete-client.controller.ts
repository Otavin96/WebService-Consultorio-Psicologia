import { DeleteClientUseCase } from "@/clients/application/usecases/delete-client.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function DeleteClientController(
  request: Request,
  response: Response
) {
  const DeleteClientSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(DeleteClientSchemaParams, request.params);

  const deleteClientsUseCase: DeleteClientUseCase.UseCase = container.resolve(
    "DeleteClientsUseCase"
  );

  await deleteClientsUseCase.execute({ id });

  response.status(200).json({ message: "CLiente deletado com sucesso!" });
}

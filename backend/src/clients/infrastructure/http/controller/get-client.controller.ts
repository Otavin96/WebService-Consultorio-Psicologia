import { GetClientUseCase } from "@/clients/application/usecases/get-client.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetClientController(
  request: Request,
  response: Response
) {
  const GetClientSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(GetClientSchemaParams, request.params);

  const getClientUseCase: GetClientUseCase.UseCase =
    container.resolve("GetClientsUseCase");

  const client = await getClientUseCase.execute({ id });

  response.status(200).json(client);
}

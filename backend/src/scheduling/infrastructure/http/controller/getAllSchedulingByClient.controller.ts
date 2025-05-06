import { dataValidation } from "@/common/infrastructure/validation/zod";
import { GetAllSchedulingByClientUseCase } from "@/scheduling/application/usecases/get-scheduling-all-by-client.scheduling-usecase.";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetAllSchedulingByClientController(
  request: Request,
  response: Response
): Promise<Response> {
  const paramSchema = z.object({
    clientId: z.string(),
  });

  const querySchema = z.object({
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort: z.string().optional(),
    sort_dir: z.string().optional(),
    filter: z.string().optional(),
  });

  const { clientId } = dataValidation(paramSchema, request.params);

  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    querySchema,
    request.query
  );

  const getAllSchedulingByClientUseCase: GetAllSchedulingByClientUseCase.UseCase =
    container.resolve("GetAllSchedulingByClientUseCase");

  const schedulings = await getAllSchedulingByClientUseCase.execute({
    clientId,
    dataSearch: {
      page: page ?? 1,
      per_page: per_page ?? 4,
      sort: sort ?? null,
      sort_dir: sort_dir ?? null,
      filter: filter ?? null,
    },
  });

  return response.status(200).json(schedulings);
}

import { dataValidation } from "@/common/infrastructure/validation/zod";
import { GetSchedulingUseCase } from "@/scheduling/application/usecases/get-scheduling.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function GetSchedulingController(
  request: Request,
  response: Response
) {
  const GetSchedulingSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(GetSchedulingSchemaParams, request.params);

  const getSchedulingsUseCase: GetSchedulingUseCase.UseCase = container.resolve(
    "GetSchedulingsUseCase"
  );

  const scheduling = await getSchedulingsUseCase.execute({ id });

  response.status(200).json(scheduling);
}

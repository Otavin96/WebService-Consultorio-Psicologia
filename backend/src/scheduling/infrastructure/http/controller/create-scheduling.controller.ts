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
    client: z.string(),
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

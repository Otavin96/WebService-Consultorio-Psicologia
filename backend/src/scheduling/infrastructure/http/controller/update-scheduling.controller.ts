import { dataValidation } from "@/common/infrastructure/validation/zod";
import { UpdateSchedulingUseCase } from "@/scheduling/application/usecases/update-scheduling-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateSchedulingController(
  request: Request,
  response: Response
) {
  const UpdateSchedulingSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(UpdateSchedulingSchemaParams, request.params);

  const CreateSchedulingSchemaBody = z.object({
    date: z.coerce.date().optional(),
    time: z.string().time().optional(),
    observations: z.string().optional(),
  });

  const { date, time, observations } = dataValidation(
    CreateSchedulingSchemaBody,
    request.body
  );

  const updateSchedulingUseCase: UpdateSchedulingUseCase.UseCase =
    container.resolve("UpdateSchedulingsUseCase");

  const scheduling = await updateSchedulingUseCase.execute({
    id,
    date,
    time,
    observations,
  });

  response.status(201).json(scheduling);
}

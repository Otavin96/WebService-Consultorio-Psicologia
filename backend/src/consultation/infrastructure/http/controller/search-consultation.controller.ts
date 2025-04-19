import { dataValidation } from "@/common/infrastructure/validation/zod";
import { SearchConsultationUseCase } from "@/consultation/application/usecases/search.consultation-usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function SearchConsultationController(
  request: Request,
  response: Response
): Promise<Response> {
  const querySchema = z.object({
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort: z.string().optional(),
    sort_dir: z.string().optional(),
    filter: z.string().optional(),
  });

  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    querySchema,
    request.query
  );

  const searchConsultationUseCase: SearchConsultationUseCase.UseCase =
    container.resolve("SearchConsultationsUseCase");

  const consultations = await searchConsultationUseCase.execute({
    page: page ?? 1,
    per_page: per_page ?? 15,
    sort: sort ?? null,
    sort_dir: sort_dir ?? null,
    filter: filter ?? null,
  });

  return response.status(200).json(consultations);
}

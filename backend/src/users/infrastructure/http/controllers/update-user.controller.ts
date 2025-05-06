import { dataValidation } from "@/common/infrastructure/validation/zod";
import { UpdateUsersUseCase } from "@/users/application/usecases/update-user.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function UpdateUserController(
  request: Request,
  response: Response
) {
  const updateUserSchemaParams = z.object({
    id: z.string(),
  });

  const updateUserSchemaBody = z.object({
    name: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    roles: z.enum(["admin", "user"]).optional(),
  });

  const { id } = dataValidation(updateUserSchemaParams, request.params);

  const { name, username, password, roles } = dataValidation(
    updateUserSchemaBody,
    request.body
  );

  const updateUsersUseCase: UpdateUsersUseCase.UseCase =
    container.resolve("UpdateUsersUseCase");

  const userUpdate = await updateUsersUseCase.execute({
    id,
    name,
    username,
    password,
    roles,
  });

  response
    .status(200)
    .json([{ message: "Usuário atualizado com sucesso!!" }, userUpdate]);
}

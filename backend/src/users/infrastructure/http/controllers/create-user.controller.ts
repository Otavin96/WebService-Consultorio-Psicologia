import { dataValidation } from "@/common/infrastructure/validation/zod";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { CreateUsersUseCase } from "@/users/application/usecases/create-user.usecase";

export async function CreateUserController(
  request: Request,
  response: Response
) {
  const createUserSchemaBody = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    roles: z.enum(["PROFISSIONAL_SAUDE", "SECRETARIA"]),
  });

  const { name, username, password, roles } = dataValidation(
    createUserSchemaBody,
    request.body
  );

  const createUserUseCase: CreateUsersUseCase.UseCase =
    container.resolve("CreateUsersUseCase");

  const user = await createUserUseCase.execute({
    name,
    username,
    password,
    roles,
  });

  response.status(200).json([{ message: "Usuário criado com sucesso!" }, user]);
}

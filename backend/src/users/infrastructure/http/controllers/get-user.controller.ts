import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetUsersUseCase } from '@/users/application/usecases/get-user.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function GetUserController(request: Request, response: Response) {
  const getUserSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(getUserSchemaParams, request.params)

  const getUserUseCase: GetUsersUseCase.UseCase =
    container.resolve('GetUsersUseCase')

  const user = await getUserUseCase.execute({ id })

  response
    .status(200)
    .json([{ message: 'Usuário encontrado com sucesso!', user }])
}

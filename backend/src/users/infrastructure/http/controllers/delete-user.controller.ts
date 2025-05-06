import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteUsersUseCase } from '@/users/application/usecases/delete-user.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function DeleteUserController(
  request: Request,
  response: Response,
) {
  const deleleUserSchemaParams = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(deleleUserSchemaParams, request.params)

  const deleteUsersUseCase: DeleteUsersUseCase.UseCase =
    container.resolve('DeleteUsersUseCase')

  await deleteUsersUseCase.execute({ id })

  response.status(200).json([{ message: 'Usuário deletado com sucesso!!' }])
}

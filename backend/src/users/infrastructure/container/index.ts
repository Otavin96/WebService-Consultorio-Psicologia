import { container } from 'tsyringe'
import { UsersTypeormRepository } from '../typeorm/repositories/users-typeorm.repository'
import { dataSource } from '@/common/infrastructure/typeorm'
import { User } from '../typeorm/entities/users.entitty'
import { CreateUsersUseCase } from '@/users/application/usecases/create-user.usecase'
import { GetUsersUseCase } from '@/users/application/usecases/get-user.usecase'
import { DeleteUsersUseCase } from '@/users/application/usecases/delete-user.usecase'
import { UpdateUsersUseCase } from '@/users/application/usecases/update-user.usecase'
import { AuthenticateUserUseCase } from '@/users/application/usecases/authenticate-user.usecase'

container.registerSingleton('UsersRepository', UsersTypeormRepository)

container.registerInstance(
  'UsersDefaultTypeormRepository',
  dataSource.getRepository(User),
)

container.registerSingleton('CreateUsersUseCase', CreateUsersUseCase.UseCase)

container.registerSingleton('GetUsersUseCase', GetUsersUseCase.UseCase)

container.registerSingleton('DeleteUsersUseCase', DeleteUsersUseCase.UseCase)

container.registerSingleton('UpdateUsersUseCase', UpdateUsersUseCase.UseCase)

container.registerSingleton(
  'AuthenticateUserUseCase',
  AuthenticateUserUseCase.UseCase,
)

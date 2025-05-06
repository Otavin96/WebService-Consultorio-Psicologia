// import { inject, injectable } from 'tsyringe'
// import { UserOutput } from '../dtos/user-out.dto'
// import { UsersRepository } from '@/users/repositories/user.repository'
// import { NotFoundError } from '@/common/domain/errors/not-found-error'

// export namespace GetAllUsersUseCase {
//   export type Output = UserOutput

//   @injectable()
//   export class UseCase {
//     constructor(
//       @inject('UsersRepository')
//       private usersRepository: UsersRepository,
//     ) {}

//     async execute(): Promise<Output> {
//       const user = await this.usersRepository.getAll()

//       if (!user) {
//         throw new NotFoundError('Users not found')
//       }

//       return user
//     }
//   }
// }

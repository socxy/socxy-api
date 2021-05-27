import { Hasher } from './contracts/hasher'
import { UserModel } from '../models/user-model'
import { AddUserRepository } from './contracts/add-user-repository'
import { SignToken } from './contracts/sign-token'
import { AddUserFieldValidador } from './contracts/add-user-field-validador'

export class AddUserService {
  constructor (
    private readonly addUserValidator: AddUserFieldValidador,
    private readonly addUserRepository: AddUserRepository,
    private readonly hasher: Hasher,
    private readonly signToken: SignToken
  ) {}

  async execute (
    input: Partial<Pick<UserModel, 'username' | 'password'>>
  ): Promise<{ accessToken: string } & Pick<UserModel, 'username'>> {
    const inputValidated = await this.addUserValidator.validate(input)

    const passwordHash = await this.hasher.hash(inputValidated.password)

    const user = await this.addUserRepository.add({
      ...inputValidated,
      password: passwordHash
    })

    const token = await this.signToken.sign({ id: user!.id })

    return {
      accessToken: token,
      username: user!.username
    }
  }
}

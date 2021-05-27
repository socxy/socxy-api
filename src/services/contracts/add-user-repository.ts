import { UserModel } from '../../models/user-model'

export interface AddUserRepository {
  add: (
    input: Pick<UserModel, 'username' | 'password'>
  ) => Promise<UserModel | undefined>
}

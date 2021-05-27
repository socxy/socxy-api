import { UserModel } from '../../models/user-model'

export interface AddUserFieldValidador {
  validate: (
    input: Partial<Pick<UserModel, 'username' | 'password'>>
  ) => Promise<Pick<UserModel, 'username' | 'password'>>
}

export class UserModel {
  public id?: string
  public username!: string
  public password!: string
  public created_at?: Date
  public updated_at?: Date

  constructor (params: UserModel) {
    Object.assign(this, params)
  }
}

type Role = 'USER' | 'ADMIN'

export interface IUser {
  id: number
  createdAt: Date
  updatedAt: Date
  avatar_url: String
  favorites: Number[]
  email: String
  username: String
  role: Role
  hash: String
  isActivated: Boolean
  activationLink: String
}

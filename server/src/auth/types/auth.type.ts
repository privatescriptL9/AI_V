import { User } from '@prisma/client'

export type AuthResponse = {
  token: string
  user: User
}

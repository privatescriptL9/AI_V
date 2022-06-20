import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from '../models/IUser'
import { AuthResponse } from '../models/response/AuthResponse'

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/local/signin', {
      email,
      password
    })
  }

  static async registration(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    return $api.post('/auth/local/signup', {
      username,
      email,
      password
    })
  }

  static async checkAuth(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/auth/checkauth')
  }
}

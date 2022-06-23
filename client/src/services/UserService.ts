import { AxiosResponse } from 'axios'
import $api from '../http'
import { IUser } from '../models/IUser'

export default class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/user/all')
  }

  static async getUserById(userId: number) {
    return $api.get(`/user/${userId}`)
  }

  static async updateInfo(username: string, password: string) {
    return $api.post('/user/updateInfo', {
      username: username ? username : null,
      password: password ? password : null
    })
  }
}

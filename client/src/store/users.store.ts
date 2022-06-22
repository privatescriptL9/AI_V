import { makeAutoObservable } from 'mobx'
import UserService from '../services/UserService'

export default class UsersStore {
  users = [] as any
  isLoading = false

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setUsers(users: any) {
    this.users = [...users]
  }

  constructor() {
    makeAutoObservable(this)
  }

  async getAll() {
    try {
      this.setLoading(true)
      const response = await UserService.fetchUsers()
      this.setLoading(false)
      this.setUsers(response.data)
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }
}

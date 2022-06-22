import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
import AuthService from '../services/AuthService'
import DatasetService from '../services/DatasetService'
import UserService from '../services/UserService'

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try {
      this.setLoading(true)
      const response = await AuthService.login(email, password)
      this.setLoading(false)
      localStorage.setItem('token', response.data.token)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }

  async register(username: string, email: string, password: string) {
    try {
      this.setLoading(true)
      const response = await AuthService.registration(username, email, password)
      this.setLoading(false)
      console.log(response)
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }

  async logout() {
    try {
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (error) {
      console.log(error)
    }
  }

  async checkAuth() {
    try {
      this.setLoading(true)
      const response = await AuthService.checkAuth()
      this.setLoading(false)
      this.setAuth(true)
      this.setUser(response.data)
    } catch (error: any) {
      this.setLoading(false)
      return false
    }
  }

  async updateInfo(username: string, password: string) {
    try {
      this.setLoading(true)
      const response = await UserService.updateInfo(username, password)
      this.setLoading(false)
      this.setUser(response.data)
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }
}

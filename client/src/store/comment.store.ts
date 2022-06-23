import { makeAutoObservable } from 'mobx'
import DatasetService from '../services/DatasetService'

export default class CommentStore {
  comments = [] as any
  isLoading = false

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setComments(comments: any) {
    this.comments = [...comments]
  }

  constructor() {
    makeAutoObservable(this)
  }

  async getAll(datasetId: number) {
    try {
      this.setLoading(true)
      const response = await DatasetService.getAllComments(datasetId)
      this.setLoading(false)
      this.setComments(response.data)
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }

  async addComment(userId: number, datasetId: number, text: string) {
    try {
      this.setLoading(true)
      const response = await DatasetService.addComment(userId, datasetId, text)
      this.setLoading(false)
      this.setComments([...this.comments, response.data])
    } catch (error: any) {
      this.setLoading(false)
      return error?.response?.data?.message
    }
  }
}

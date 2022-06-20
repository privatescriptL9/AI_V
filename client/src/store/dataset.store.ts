import { makeAutoObservable } from 'mobx'
import DatasetService from '../services/DatasetService'

export default class DatasetStore {
  datasets = [] as any
  favorites = [] as any
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setDatasets(datasets: any) {
    this.datasets = [...datasets]
  }

  setFavorites(favorites: any) {
    this.favorites = [...favorites]
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  async getAllDatasets() {
    try {
      this.setLoading(true)
      const response = await DatasetService.getAll()
      this.setLoading(false)
      this.setDatasets(response.data)
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }

  async getDatasetById(id: number) {
    const dataset = this.datasets.find((dataset: any) => dataset.id === id)

    return dataset
  }

  async addToFavorite(datasetId: number) {
    try {
      this.setLoading(true)
      const response = await DatasetService.addToFavorite(datasetId)
      this.setLoading(false)
      const dataset = this.datasets.filter((item: any) => item.id === datasetId)
      this.favorites = [...this.favorites, dataset]
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }

  async removeFromFavorite(datasetId: number) {
    try {
      this.setLoading(true)
      const response = await DatasetService.removeFromFavorite(datasetId)
      this.setLoading(false)

      this.favorites = this.favorites.filter(
        (item: any) => item.id === datasetId
      )
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }
}

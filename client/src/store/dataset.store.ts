import { makeAutoObservable } from 'mobx'
import DatasetService from '../services/DatasetService'

export default class DatasetStore {
  datasets = [] as any
  isLoading = false
  favorites = [] as any

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
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }

  async removeFromFavorite(datasetId: number) {
    try {
      this.setLoading(true)
      const response = await DatasetService.removeFromFavorite(datasetId)
      this.setLoading(false)
      this.setFavorites(
        this.favorites.filter((item: any) => item.id !== datasetId)
      )
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }

  async getAllFavorites() {
    try {
      this.setLoading(true)
      const response = await DatasetService.getAllFavorites()
      this.setLoading(false)
      this.setFavorites(response.data)
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }

  async addDataset(
    title: string,
    description: string,
    preview: string,
    archive: any
  ) {
    try {
      this.setLoading(true)
      const response = await DatasetService.addDataset(
        title,
        description,
        preview,
        archive
      )
      this.setLoading(false)
      this.setDatasets([...this.datasets, response.data])
    } catch (error: any) {
      return error?.response?.data?.message
    }
  }
}

import $api from '../http'

export default class DatasetService {
  static async getAll() {
    return $api.get('/dataset/all')
  }

  static async addToFavorite(datasetId: number) {
    return $api.post('/dataset/add_to_favorite', { datasetId })
  }

  static async removeFromFavorite(datasetId: number) {
    return $api.post('/dataset/remove_from_favorite', { datasetId })
  }

  static async getAllFavorites() {
    return $api.get('/dataset/favorites')
  }

  static async addDataset(
    title: string,
    description: string,
    preview: string,
    archive: any
  ) {
    return $api.post('/dataset/add', {
      title,
      description,
      preview,
      archive
    })
  }

  static async addDownload(datasetId: number) {
    return $api.post('/dataset/addDownload', {
      datasetId
    })
  }

  static async getAllComments(datasetId: number) {
    return $api.get(`/comment/all/${datasetId}`)
  }

  static async addComment(userId: number, dataId: number, text: string) {
    return $api.post('/comment/add', {
      userId,
      dataId,
      text
    })
  }
}

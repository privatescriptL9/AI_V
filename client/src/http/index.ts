import axios from 'axios'

export const API_URL = 'https://ai-v-api.kodep.team'

const $api = axios.create({
  baseURL: API_URL
})

$api.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  }
})

export default $api

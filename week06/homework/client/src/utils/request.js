import axios from 'axios'
import { getToken } from '@/utils/token'

const API_URL = import.meta.env.VITE_API_URL

// 创建axios实例
const request = axios.create({
  baseURL: `${API_URL}`, 
  timeout: 5000, 
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const token = getToken() 
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
import axios from 'axios'

// API基础URL配置
const API_BASE_URL = ""



const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
})

export default request 
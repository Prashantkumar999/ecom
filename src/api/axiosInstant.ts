import axios from "axios"
import { API_PATHS } from "../constants"
const axiosInstance = axios.create({
  baseURL:API_PATHS.BASE_URL,
})

axiosInstance.interceptors.request.use(
  config => {
    console.log("Request sent:")
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    console.log("Response received:")
    return response
  },
  error => {
    console.error("API Error:", error.response?.status)
    return Promise.reject(error)
  }
)

export default axiosInstance

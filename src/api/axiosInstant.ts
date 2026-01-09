import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
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

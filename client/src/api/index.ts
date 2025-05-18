import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config
})

api.interceptors.response.use( 
  (response) => response,
  (error) => {
    if(error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  } 
)

export default api 

import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios'
import {API_BASE} from '../../config'

interface AjaxOptions {
  baseURL?: string
  headers?: object
  method?: Method
  data?: any
}

export type ServerResponseData = any

export const ajax = (url: string, options: AjaxOptions) => {

  const axiosOptions: AxiosRequestConfig = {
    baseURL: options.baseURL || API_BASE,
    headers: options.headers,
    method: options.method || 'get',
    timeout: 5000
  }

  if (options.data && ~['get', 'delete'].indexOf(options.method as string)) {
    axiosOptions.params = options.data
  } else {
    axiosOptions.data = options.data
  }

  return new Promise<ServerResponseData>((resolve, reject) => {
    axios(url, axiosOptions)
      .then((res: AxiosResponse<ServerResponseData>) => {
        resolve(res.data)
      })
      .catch((err: AxiosError) => {
        console.error(err)
        reject(err.response)
      })
  })
}

export const GET = (url: string, options: AjaxOptions) =>
  ajax(url, {
    ...options,
    method: 'get'
  })

export const POST = (url: string, options: AjaxOptions) =>
  ajax(url, {
    ...options,
    method: 'post'
  })

import { from } from 'rxjs'
import { SITE_ID } from '../config'
import { retryWithDelay } from '../utils/rx-retry'
import { GET, POST } from './restful/ajax'

function getAuth() {
  const token = localStorage.getItem('token')
  return {
    Authorization: token && `Bearer ${token}`,
    siteId: SITE_ID
  }
}

export const request = {
  get(url: string, params?: Record<string, any>) {
    return from(
      GET(url, {
        headers: getAuth(),
        data: params
      })
    ).pipe(retryWithDelay())
  },

  post(url: string, data?: Record<string, any>) {
    return from(
      POST(url, {
        headers: getAuth(),
        data
      })
    )
  }
}

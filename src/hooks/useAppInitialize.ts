import { useEffect, useState } from 'react'
import { forkJoin } from 'rxjs'
import { request } from '../api'
import { DeviceBridge } from '../api/device/bridge'
import { store } from '../stores'

export const useAppInitialize = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscription = forkJoin([
      request.post('auth', DeviceBridge.getAuthParams()),
      store.channel.findAll()
    ]).subscribe(() => {
      setLoading(false)
    })

    return subscription.unsubscribe
  }, [])

  return {
    loading
  }
}

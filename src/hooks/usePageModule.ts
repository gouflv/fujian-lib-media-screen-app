import {useEffect, useState} from 'react'
import {store} from '../stores'
import {PageModule} from '../typing'
import {useChannelContext} from './useChannels'

export function usePageModule() {
  const {currentChannel} = useChannelContext()

  const [loading, setLoading] = useState(true)
  const [pageModule, set] = useState<PageModule>()

  useEffect(() => {
    if (currentChannel[1]) {
      store.pageModule.findPageModule(currentChannel[1].id)
        .subscribe(data => {
          set(data)
          setLoading(false)
        })
    }
  }, [currentChannel])

  return {
    loading,
    pageModule
  }
}

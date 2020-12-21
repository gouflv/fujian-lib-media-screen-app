import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { store } from '../stores'
import { PageModule } from '../typing'
import { autoUnsubscribe } from '../utils/autoUnsubscribe'
import { useChannelContext } from './useChannelContext'

export function usePageModule(channelId?: number) {
  const { currentChannel } = useChannelContext()

  const currentChannelId = useMemo(() => {
    return channelId ? channelId : currentChannel[1] && currentChannel[1].id
  }, [currentChannel, channelId])

  const [loading, setLoading] = useState(true)
  const [pageModule, set] = useState<PageModule>()

  useEffect(() => {
    if (currentChannelId) {
      setLoading(true)
      return autoUnsubscribe(
        store.pageModule.findPageModule(currentChannelId).subscribe(data => {
          set(data)
          setLoading(false)
        })
      )
    }
  }, [currentChannelId])

  const findModuleArticles = useCallback(
    (name: string) => {
      return _.chain(pageModule?.modules)
        .find(mo => mo.channel.name === name)
        .get('articles', [])
        .value()
    },
    [pageModule]
  )

  return {
    loading,
    pageModule,
    findModuleArticles
  }
}

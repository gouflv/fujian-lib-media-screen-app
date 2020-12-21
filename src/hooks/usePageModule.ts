import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { store } from '../stores'
import { Channel, PageModule } from '../typing'
import { autoUnsubscribe } from '../utils/autoUnsubscribe'
import { useChannelContext } from './useChannelContext'

export function usePageModule(channel?: Channel) {
  const { currentChannel } = useChannelContext()

  const [loading, setLoading] = useState(true)
  const [pageModule, set] = useState<PageModule>()

  useEffect(() => {
    const _channel = channel || currentChannel[1]
    if (_channel) {
      setLoading(true)
      return autoUnsubscribe(
        store.pageModule.findPageModule(_channel).subscribe(data => {
          set(data)
          setLoading(false)
        })
      )
    }
  }, [channel, currentChannel])

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

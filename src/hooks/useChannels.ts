import constate from 'constate'
import _ from 'lodash'
import {useEffect, useState} from 'react'
import {store} from '../stores'
import {Channel} from '../typing'

const [ChannelProvider, useChannelContext] = constate(() => {
  const [loading, setLoading] = useState(true)

  const [channels, setChannels] = useState<Channel[]>([])

  const [currentChannel, setCurrent] = useState<(Channel | null)[]>([])

  function setTopChannel(data: Channel) {
    if (data.children?.length) {
      setCurrent([data, data.children[0]])
    } else {
      setCurrent([data])
    }
  }

  function setSubChannel(data: Channel) {
    setCurrent(prevState => [prevState[0], data])
  }

  useEffect(() => {
    store.channel.findAll().subscribe(value => {
      setLoading(false)
      setChannels(value)
      setTopChannel(_.first(value) as Channel)
    })
  }, [])

  return {
    loading,
    channels,
    currentChannel,
    setTopChannel,
    setSubChannel
  }
})

ChannelProvider.displayName = 'ChannelProvider'

export {ChannelProvider, useChannelContext}


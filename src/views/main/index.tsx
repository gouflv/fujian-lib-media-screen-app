import { FC, useEffect, useState } from 'react'
import { useChannelContext } from '../../hooks/useChannelContext'
import { Channel } from '../../typing'
import { Home } from './home'

export const Main: FC = () => {
  const { currentChannel } = useChannelContext()

  const [top, set] = useState<Channel>()

  useEffect(() => {
    if (currentChannel[0]) {
      set(currentChannel[0])
    }
  }, [currentChannel])

  function renderPage() {
    switch (top?.name) {
      case '首页':
        return <Home />
      case '品牌':
      case '活动':
      case '视听':
      default:
        return null
    }
  }

  return renderPage()
}

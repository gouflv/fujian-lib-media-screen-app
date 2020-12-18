import { useEffect, useState } from 'react'
import { useChannelContext } from '../../../hooks/useChannelContext'
import { Channel } from '../../../typing'
import { BookPage } from './BookPage'
import { HomePage } from './HomePage'

export const Home = () => {
  const { currentChannel } = useChannelContext()

  const [subChannel, set] = useState<Channel>()

  useEffect(() => {
    if (currentChannel[1]) {
      set(currentChannel[1])
    }
  }, [currentChannel])

  if (subChannel?.name === '读书') {
    return <BookPage />
  }

  return <HomePage />
}

import { FC } from 'react'
import RCVideo from 'react-player'
import styled from 'styled-components'
import { px2vw } from '../../styles/utils'

export const Video: FC<{
  url: string
}> = ({ url }) => {
  return (
    <VideoBox className='video'>
      <RCVideo
        className='rc-video'
        url={url}
        width={'100%'}
        height={'100%'}
        playing
        controls
      />
    </VideoBox>
  )
}

const VideoBox = styled.div`
  flex: auto;
  display: flex;

  .rc-video {
    font-size: ${px2vw(24)};
    border-radius: ${px2vw(4)};
    background: #000;
  }
`

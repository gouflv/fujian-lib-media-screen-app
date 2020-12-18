import { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import video from 'video.js'
import { borderRadius } from '../../styles/theme'
import { px2vw } from '../../styles/utils'

export const Video: FC<{
  url: string
}> = ({ url }) => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!url) return
    const player = video(ref.current, {
      controls: true,
      autoplay: true,
      sources: [
        {
          src: url
        }
      ]
    })
    return () => {
      player && player.dispose()
    }
  }, [url])

  return (
    <VideoBox className='video'>
      <video ref={ref} className='video-box video-js'></video>
    </VideoBox>
  )
}

const VideoBox = styled.div`
  flex: auto;
  display: flex;

  .video-js {
    flex: auto;
    height: 100%;
    font-size: ${px2vw(24)};
    border-radius: ${px2vw(4)};
  }
`

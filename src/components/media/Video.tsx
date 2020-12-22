import { useLocalStorageState } from 'ahooks'
import { Slider } from 'antd'
import { rgba } from 'polished'
import { FC, useRef, useState } from 'react'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import RCVideo from 'react-player'
import styled, { css } from 'styled-components'
import { ThemeProps } from '../../styles/theme'
import { px2vw } from '../../styles/utils'
import screenfull from 'screenfull'

function durationFormat(seconds: number) {
  function pad(string) {
    return ('0' + string).slice(-2)
  }

  const date = new Date(Math.round(seconds) * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

export const Video: FC<{
  url: string
}> = ({ url }) => {
  // video
  const video = useRef<ReactPlayer>(null)

  const [play, setPlay] = useState(true)
  const [volume, setVolume] = useLocalStorageState('player-volume', 1)
  const [seeking, setSeeking] = useState(false)
  const [played, setPlayed] = useState(0)
  const [playedSeconds, setPlayedSeconds] = useState(0)
  const [duration, setDuration] = useState(0)

  function onSeek(val) {
    setPlayed(val)
    setSeeking(true)
  }

  function onSeekDone(val) {
    setSeeking(false)
    video.current && video.current.seekTo(val)
  }

  function onProgress(state) {
    if (!seeking) {
      setPlayed(state.played)
      setPlayedSeconds(state.playedSeconds)
      if (state.played === 1) {
        setControlVisible(true)
      }
    }
  }

  function onFullscreenClick() {
    if (screenfull.isEnabled && video.current) {
      screenfull.request(findDOMNode(video.current) as any)
    }
  }
  //

  // control
  const [controlVisible, setControlVisible] = useState(false)

  const timer = useRef<number>()
  function openControl() {
    setControlVisible(true)
    if (timer.current) clearInterval(timer.current)
    timer.current = setTimeout(() => setControlVisible(false), 5000)
  }
  //

  return (
    <Wrapper>
      <VideoBox className='video' onClick={openControl}>
        <RCVideo
          ref={video}
          className='rc-video'
          width={'100%'}
          height={'100%'}
          url={url}
          playing={play}
          volume={volume}
          onPlay={() => setPlay(true)}
          onPause={() => setPlay(false)}
          onProgress={onProgress}
          onDuration={duration => {
            setDuration(duration)
            openControl()
          }}
        />
        <ControlBar visible={controlVisible}>
          {play ? (
            <PurseIcon onClick={() => setPlay(false)} />
          ) : (
            <PlayIcon onClick={() => setPlay(true)} />
          )}
          <Volume value={volume} onChange={setVolume} />
          <StyledSeek>
            <div className='progress'>
              {durationFormat(playedSeconds)} / {durationFormat(duration)}
            </div>
            <Slider
              max={1}
              step={0.01}
              tooltipVisible={false}
              value={played}
              onChange={onSeek}
              onAfterChange={onSeekDone}
            />
          </StyledSeek>
          <FullscreenIcon onClick={onFullscreenClick} />
        </ControlBar>
      </VideoBox>
    </Wrapper>
  )
}

const Volume: FC<{ value: number; onChange: (val: number) => void }> = ({
  value,
  onChange
}) => {
  return (
    <VolumeBox>
      <VolumeIcon
        type={value === 0 ? 0 : value <= 0.5 ? 1 : 2}
        onClick={() => (!value ? onChange(0.5) : onChange(0))}
      />
      <Slider
        max={1}
        step={0.1}
        tooltipVisible={false}
        value={value}
        onChange={val => onChange(val)}
      />
    </VolumeBox>
  )
}

// styled
const Wrapper = styled.div`
  flex: auto;
`

const VideoBox = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%;

  .rc-video {
    position: absolute;
    left: 0;
    top: 0;
    font-size: ${px2vw(24)};
    border-radius: ${px2vw(4)};
    background: #000;
  }
`

const basePx2vw = val => px2vw(val * 1)

const Icon = css`
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background-color: #fff;
`

const ControlBar = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: 100%;
  height: ${basePx2vw(80)};
  background-color: ${rgba('#000', 0.6)};
  display: flex;
  align-items: center;
  padding: 0 ${basePx2vw(30)};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 300ms ease;
`

const PlayIcon = styled.div`
  margin-right: ${basePx2vw(20)};
  width: ${basePx2vw(48)};
  height: ${basePx2vw(48)};
  mask-image: url(${require('../../assets/play.svg').default});
  ${Icon}
`
const PurseIcon = styled.div`
  margin-right: ${basePx2vw(20)};
  width: ${basePx2vw(48)};
  height: ${basePx2vw(48)};
  mask-image: url(${require('../../assets/suspend.svg').default});
  ${Icon}
`

const VolumeIcon = styled.div<{ type: 0 | 1 | 2 }>`
  width: ${basePx2vw(48)};
  height: ${basePx2vw(48)};
  mask-image: url(${props =>
    ({
      0: require('../../assets/vol0.svg').default,
      1: require('../../assets/vol1.svg').default,
      2: require('../../assets/vol2.svg').default
    }[props.type])});
  ${Icon};
  mask-size: ${props => (props.type === 1 ? '69%' : '86%')};
  mask-position: left center;
`

const sliderBase = css`
  .ant-slider-rail {
    height: ${basePx2vw(8)};
    border-radius: ${basePx2vw(8 / 2)};
  }
  .ant-slider-track {
    height: ${basePx2vw(13)};
    border-radius: ${basePx2vw(13 / 2)};
    top: ${basePx2vw(1)};
    background-color: ${(props: ThemeProps) => props.theme.color.blue};
  }
  .ant-slider-handle {
    width: ${basePx2vw(24)};
    height: ${basePx2vw(24)};
    top: ${basePx2vw(1)};
    border: none;
  }
`

const VolumeBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${basePx2vw(20)};
  margin-right: ${basePx2vw(20)};

  .ant-slider {
    margin-left: ${basePx2vw(20)};
    width: ${basePx2vw(120)};
    ${sliderBase};
  }
`

const StyledSeek = styled.div`
  flex: auto;
  display: flex;
  align-items: center;
  margin-left: ${basePx2vw(20)};
  margin-right: ${basePx2vw(20)};
  .progress {
    margin-right: ${basePx2vw(20)};
    flex: auto;
    color: #fff;
    white-space: nowrap;
  }
  .ant-slider {
    width: 100%;
    ${sliderBase};
  }
`

const FullscreenIcon = styled.div`
  margin-left: ${basePx2vw(20)};
  width: ${basePx2vw(48)};
  height: ${basePx2vw(48)};
  mask-image: url(${require('../../assets/menu.svg').default});
  ${Icon};
  mask-size: 90%;
`

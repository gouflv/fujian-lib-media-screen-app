import clsx from 'clsx'
import styled from 'styled-components'
import { useChannelContext } from '../hooks/useChannelContext'
import { ThemeProps } from '../styles/theme'
import { px2vw } from '../styles/utils'

export const SideNav = () => {
  const { channels, currentChannel, setTopChannel } = useChannelContext()

  function splitName(name) {
    return name.split('').join('<br>')
  }

  function onClick(data) {
    setTopChannel(data)
  }

  return (
    <Side>
      <nav>
        <ol>
          {channels.map(c => (
            <li
              className={clsx({
                active: c === currentChannel[0]
              })}
              key={c.id}
              dangerouslySetInnerHTML={{ __html: splitName(c.name) }}
              onClick={() => onClick(c)}
            />
          ))}
        </ol>
      </nav>
    </Side>
  )
}

const Side = styled.aside`
  margin-left: ${px2vw(30)};
  padding-top: ${px2vw(26)};
  flex: 0 0 ${px2vw(50)};

  li {
    margin-bottom: ${px2vw(24)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${px2vw(50)};
    height: ${px2vw(180)};
    background-color: #fff;
    font-size: ${(props: ThemeProps) => props.theme.font.lg};
    line-height: 1.15;
    text-align: center;
    color: ${(props: ThemeProps) => props.theme.color.blue};
    cursor: pointer;
    border-radius: ${px2vw(50)};
    box-shadow: ${(props: ThemeProps) => props.theme.boxShadow.base};

    &::before {
      content: '';
      display: none;
      width: ${px2vw(14)};
      height: ${px2vw(14)};
      border-radius: 100%;
      background: #fff;
      margin-bottom: ${px2vw(8)};
    }

    &.active {
      background-color: #6db5e5;
      color: #fff;

      &::before {
        display: block;
      }
    }
  }
`

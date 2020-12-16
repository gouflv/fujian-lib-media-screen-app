import clsx from 'clsx'
import _ from 'lodash'
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {HomeSubChannelName} from '../config'
import {useChannelContext} from '../hooks/useChannels'
import {ThemeProps} from '../styles/theme'
import {px2vw} from '../styles/utils'
import {Channel} from '../typing'

export const HeaderNav = () => {
  const {currentChannel, setSubChannel} = useChannelContext()

  const [menu, setMenu] = useState<Channel[]>([])

  useEffect(() => {
    if (!currentChannel[0]?.children) {
      return
    }

    const top = currentChannel[0]
    const children = top.children || []

    if (top.name === '首页') {
      setMenu(
        HomeSubChannelName.reduce<Channel[]>((res, name) => {
          const m = _.find(children, { name })
          m && res.push(m)
          return res
        }, [])
      )
      return
    }

    setMenu(children)
  }, [currentChannel])

  function onClick(data: Channel) {
    setSubChannel(data)
  }

  return (
    <Nav>
      <ol>
        {menu.map(m => (
          <li
            key={m.id}
            className={clsx({
              'active': m === currentChannel[1]
            })}
            onClick={() => onClick(m)}
          >{m.name}</li>
        ))}
      </ol>
    </Nav>
  )
}

const Nav = styled.nav`
  overflow-x: auto;
  overflow-scrolling: touch;

  ol {
    display: flex;
  }

  li {
    flex: 0 0 auto;
    padding: 0 ${px2vw(30)};
    height: ${px2vw(85)};
    line-height: ${px2vw(85)};
    border-bottom-left-radius: ${px2vw(20)};
    border-bottom-right-radius: ${px2vw(20)};
    color: ${(props: ThemeProps) => props.theme.color.blue};
    font-size: ${(props: ThemeProps) => props.theme.font.xl};
    text-align: center;

    &.active {
      padding: 0 50px;
      background: linear-gradient(
        135deg,
        rgba(17, 124, 211, 1) 0%,
        rgba(92, 213, 228, 1) 100%
      );
      color: #fff;
      font-size: ${px2vw(36)};
    }
  }
`

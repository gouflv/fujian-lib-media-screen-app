import clsx from 'clsx'
import { FC } from 'react'
import styled from 'styled-components'
import tabActiveBg from '../assets/tab-active.png'
import { ThemeProps } from '../styles/theme'

export interface TabsProps {
  tabs: { key: number | string; label: string }[]
  activeKey?: number | string
  onClick?: (value) => void
}

export const Tabs: FC<TabsProps> = props => {
  return (
    <TabNav>
      {props.tabs.map(tab => (
        <TabPanel
          key={tab.key}
          className={clsx({
            active: props.activeKey && tab.key === props.activeKey
          })}
          onClick={() => props.onClick && props.onClick(tab.key)}
        >
          {tab.label}
        </TabPanel>
      ))}
    </TabNav>
  )
}

const TabNav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`

const TabPanel = styled.div`
  position: relative;
  margin: 0 20px;
  font-size: ${(props: ThemeProps) => props.theme.font.xl};
  &.active {
    &::after {
      content: '';
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 121px;
      height: 11px;
      background-image: url(${tabActiveBg});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
`

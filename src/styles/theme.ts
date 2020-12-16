import { rgba } from 'polished'
import {css} from 'styled-components'
import {px2vw} from './utils'

export const theme = {
  font: {
    sm: px2vw(16),
    base: px2vw(20),
    lg: px2vw(24),
    xl: px2vw(30)
  },
  color: {
    text: '#333',
    blue: '#3b83b4',
  },
  border: {
    radius: px2vw(16)
  },
  boxShadow: {
    base: `0 8px 20px ${rgba('#2591a1', 0.3)}`
  }
}

export type ThemeProps = { theme: typeof theme }

export const borderRadius = css`
  border-radius: ${(props: ThemeProps) => props.theme.border.radius};
  overflow: hidden;
`

export const boxShadow = css`
  box-shadow: ${(props: ThemeProps) => props.theme.boxShadow.base};
`

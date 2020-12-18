import styled from 'styled-components'
import { px2vw } from '../../styles/utils'

export const FlexGrid = styled.div<{
  span: number
  gutter: number[]
  align?: 'flex-start' | 'center' | 'stretch'
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props.align && 'stretch'};
  margin: ${props => px2vw(props.gutter[1] / -2)}
    ${props => px2vw(props.gutter[0] / -2)};

  > div {
    flex: 0 0
      calc(
        ${props => (props.span * 100).toFixed(6)}% -
          ${props => px2vw(props.gutter[0])}
      );
    margin: ${props => px2vw(props.gutter[1] / 2)}
      ${props => px2vw(props.gutter[0] / 2)};
    min-width: 0;
  }
`

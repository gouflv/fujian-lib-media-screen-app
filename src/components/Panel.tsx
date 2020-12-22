import styled from 'styled-components'
import { px2vw } from '../styles/utils'

export const Panel = styled.section`
  margin-bottom: ${px2vw(45)};
  display: flex;
  flex-direction: column;

  .body {
    flex: auto;
  }
`

export const PanelHeader = styled.header`
  flex: 0 0 auto;
  margin-bottom: ${px2vw(20)};
  line-height: 1.15;
  font-size: ${px2vw(26)};
`

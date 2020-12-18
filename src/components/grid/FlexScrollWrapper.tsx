import styled from 'styled-components'
import { px2vw } from '../../styles/utils'

export const FlexScrollWrapper = styled.div`
  flex: auto;
  min-height: 0;
  padding: ${px2vw(40)} ${px2vw(60)};
  overflow-y: auto;
`

import styled from 'styled-components'
import { ThemeProps } from '../../styles/theme'
import { px2vw } from '../../styles/utils'

export const ArticleHeader = styled.header<{ center: boolean }>`
  margin-bottom: 40px;
  text-align: ${props => (props.center ? 'center' : 'left')};

  .title {
    margin-bottom: 0.5em;
    color: #000;
    font-size: ${px2vw(28)} !important;
  }

  .desc {
    color: #777;
    font-size: ${(props: ThemeProps) => props.theme.font.base};
    span {
      margin: 0 0.5em;
    }
  }
`

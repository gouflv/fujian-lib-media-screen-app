import styled from 'styled-components'
import { ThemeProps } from '../../styles/theme'

export const Article = styled.article`
  font-size: ${(props: ThemeProps) => props.theme.font.lg} !important;
  color: #333 !important;
  max-width: 40em;
  margin: auto;
  pointer-events: none;

  p {
    margin: 1rem 0 !important;
    font-size: ${(props: ThemeProps) => props.theme.font.lg} + 4 !important;
    line-height: 1.8 !important;
    text-align: justify !important;
  }

  img {
    border-radius: 4px;
  }
`

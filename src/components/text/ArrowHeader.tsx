import { FC } from 'react'
import styled, { css } from 'styled-components'
import { ThemeProps } from '../../styles/theme'

export const ArrowHeader: FC = props => (
  <Header className='arrow-header'>
    <i className='arrow-l' />
    {props.children}
    <i className='arrow-r' />
  </Header>
)

const arrow = css`
  display: inline-block;
  width: 25px;
  height: 49px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

const Header = styled.header`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props: ThemeProps) => props.theme.font.xl};

  .arrow-l {
    ${arrow};
    margin-right: 2rem;
    background-image: url(${require('../../assets/header-ar-l.png').default});
  }

  .arrow-r {
    ${arrow};
    margin-left: 2rem;
    background-image: url(${require('../../assets/header-ar-r.png').default});
  }
`

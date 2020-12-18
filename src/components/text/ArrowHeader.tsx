import { FC } from 'react'
import styled from 'styled-components'

export const ArrowHeader: FC = props => (
  <Header>
    <i className='header-arrow-l' />
    {props.children}
    <i className='header-arrow-r' />
  </Header>
)

const Header = styled.header``

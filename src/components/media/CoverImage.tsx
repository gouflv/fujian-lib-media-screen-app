import {FC} from 'react'
import styled from 'styled-components'
import {px2vw} from '../../styles/utils'

const BgBox = styled.div<{ url }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.url});
`

const Wrapper = styled.div<{ width?, height? }>`
  flex: 0 0 auto;
  position: relative;
  height: ${props => px2vw(props.height || 300)};
`

export const CoverImage: FC<{ url: string, height: number }> = props => (
  <Wrapper className='cover-image' height={props.height}>
    <BgBox className='image' url={props.url} />
  </Wrapper>
)

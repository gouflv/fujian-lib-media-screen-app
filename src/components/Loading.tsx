import { Spin } from 'antd'
import styled from 'styled-components'
import { px2vw } from '../styles/utils'

export const Loading = () => (
  <LoadingWrapper>
    <Spin size='large' />
  </LoadingWrapper>
)

const LoadingWrapper = styled.div`
  padding-top: ${px2vw(100)};
  text-align: center;
`

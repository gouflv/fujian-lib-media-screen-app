import { Spin } from 'antd'
import styled from 'styled-components'
import { useAppInitialize } from './hooks/useAppInitialize'
import { ChannelProvider } from './hooks/useChannels'
import { Layout } from './layouts'
import { Main } from './views/main'

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

function App() {
  const { loading } = useAppInitialize()

  if (loading) {
    return (
      <Loading>
        <Spin size={'large'} />
      </Loading>
    )
  }
  return (
    <div className='App'>
      <ChannelProvider>
        <Layout>
          <Main />
        </Layout>
      </ChannelProvider>
    </div>
  )
}

export default App

import { FC } from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.png'
import { px2vw } from '../styles/utils'
import { HeaderNav } from './HeaderNav'
import { SearchBar } from './SearchBtn'
import { SideNav } from './SideNav'

export const Layout: FC = props => {
  function reload() {
    window.location.reload()
  }

  return (
    <Container>
      <Header>
        <img src={logo} className='logo' alt='' onClick={reload} />
        <HeaderNav />
        <SearchBar />
      </Header>

      <div className='layout-content'>
        <SideNav />
        <main>{props.children}</main>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .layout-content {
    flex: auto;
    min-height: 0;
    display: flex;
  }

  main {
    flex: auto;
    padding: 0 ${px2vw(40)} ${px2vw(50)} ${px2vw(40)};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    > div {
      margin-top: ${px2vw(16)};
    }
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: ${px2vw(85)};
  padding: 0 ${px2vw(50)};
  margin-bottom: ${px2vw(10)};

  .logo {
    flex: 0 0 auto;
    margin-right: ${px2vw(50)};
    height: 70%;
  }

  nav {
    flex: auto;
  }
`

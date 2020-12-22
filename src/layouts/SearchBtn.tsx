import { useState } from 'react'
import styled from 'styled-components'
import icon from '../assets/search.png'
import { ThemeProps } from '../styles/theme'
import { SearchDialog } from '../views/dialog/Search'

export const SearchBtn = () => {
  const [visible, set] = useState(false)

  return (
    <>
      <Search onClick={() => set(true)}>
        <i />
        请输入搜索
      </Search>
      <SearchDialog visible={visible} onCancel={() => set(false)} />
    </>
  )
}

const Search = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 230px;
  height: 55px;
  line-height: 55px;
  color: ${(props: ThemeProps) => props.theme.color.blue};
  border: 1px solid ${(props: ThemeProps) => props.theme.color.blue};
  border-radius: 55px;
  i {
    margin-right: 8px;
    width: 28px;
    height: 28px;
    background-image: url(${icon});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`

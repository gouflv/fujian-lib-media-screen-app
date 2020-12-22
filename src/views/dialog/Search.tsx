import { FC, useState } from 'react'
import styled from 'styled-components'
import { request } from '../../api'
import { Dialog, DialogProps } from '../../components/dialog/Dialog'
import { FlexGrid } from '../../components/grid/FlexGrid'
import { FlexScrollWrapper } from '../../components/grid/FlexScrollWrapper'
import { ArticleItem } from '../../components/list/article/ArticleItem'
import { Loading } from '../../components/Loading'
import { ArrowHeader } from '../../components/text/ArrowHeader'
import { useDialogContext } from '../../hooks/useDialogContext'
import { ThemeProps } from '../../styles/theme'
import { Article } from '../../typing'

export const SearchDialog: FC<DialogProps> = props => {
  const { openDialog } = useDialogContext()

  const [keyword, setKeyword] = useState('')
  const [showHeader, setHeader] = useState(true)

  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Article[]>([])

  async function fetch() {
    setLoading(true)
    const data = await request
      .get('article/api/articles', {
        keyword,
        size: 50
      })
      .toPromise()
    setList(data)
    setLoading(false)
  }

  function onSubmit() {
    setHeader(false)
    fetch()
  }

  return (
    <Dialog {...props}>
      <SearchContent>
        <FlexScrollWrapper>
          {showHeader && <ArrowHeader>搜索</ArrowHeader>}

          <form onSubmit={onSubmit}>
            <input
              type='text'
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder='输入搜索关键字'
            />
            <i />
          </form>

          {loading && <Loading />}

          {!loading && (
            <FlexGrid span={1 / 5} gutter={[40, 40]}>
              {list.map(it => (
                <ArticleItem
                  key={it.id}
                  thumb={it.thumbnail}
                  title={it.title}
                  onClick={() => openDialog(it)}
                />
              ))}
            </FlexGrid>
          )}
        </FlexScrollWrapper>
      </SearchContent>
    </Dialog>
  )
}

const SearchContent = styled.div`
  .arrow-header {
    margin-top: 40px;
    margin-bottom: 60px;
  }

  form {
    flex: 0 0 auto;
    margin: 0 auto 20px;
    width: 60%;
    display: flex;
    align-items: center;
    border: 1px solid #59a3e1;
    border-radius: 6px;
    overflow: hidden;

    input {
      flex: auto;
      height: 70px;
      padding: 0 2rem;
      border: none;
      font-size: ${(props: ThemeProps) => props.theme.font.lg};
    }

    i {
      margin-right: 1rem;
      width: 42px;
      height: 41px;
      background-image: url(${require('../../assets/search.png').default});
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
`

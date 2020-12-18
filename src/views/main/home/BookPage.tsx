import { rgba } from 'polished'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dialog } from '../../../components/dialog/Dialog'
import { FlexGrid } from '../../../components/grid/FlexGrid'
import { Loading } from '../../../components/Loading'
import { CoverImage } from '../../../components/media/CoverImage'
import { TextEllipsis } from '../../../components/text/TextEllipsis'
import { store } from '../../../stores'
import { borderRadius, boxShadow, ThemeProps } from '../../../styles/theme'
import { px2vw } from '../../../styles/utils'
import { Book, BookGroup } from '../../../typing'
import { autoUnsubscribe } from '../../../utils/autoUnsubscribe'
import { Panel, PanelHeader } from '../../shared/Panel'

export const BookPage = () => {
  const [loading, setLoading] = useState(true)
  const [groups, set] = useState<BookGroup[]>([])

  useEffect(() => {
    return autoUnsubscribe(
      store.pageModule.findBookGroups().subscribe(data => {
        setLoading(false)
        set(data)
      })
    )
  }, [])

  // detail
  const [detailVisible, setDetailVisible] = useState(false)
  const [detailData, setDetailData] = useState<Book>()

  function openDetail(data) {
    setDetailData(data)
    setDetailVisible(true)
  }
  //

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      {groups.map(g => (
        <BookPanel key={g.group.id}>
          <PanelHeader>{g.group.name}</PanelHeader>
          <div className='body'>
            <FlexGrid span={1 / 9} gutter={[30, 0]} align='flex-start'>
              {g.books.map(b => (
                <BookCard key={b.id} onClick={() => openDetail(b)}>
                  <CoverImage url={b.thumbnail} height={210} />
                  <TextEllipsis className='content'>{b.title}</TextEllipsis>
                </BookCard>
              ))}
            </FlexGrid>
          </div>
        </BookPanel>
      ))}

      <BookDialog
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
      >
        {detailData && (
          <BookDetail>
            <div className='wrapper'>
              <CoverImage url={detailData.thumbnail} />
              <div className='content'>
                <div className='title'>{detailData.title}</div>
                <div className='desc'>{detailData.author}</div>
                <div className='btn'>点击在线阅读</div>
              </div>
            </div>
          </BookDetail>
        )}
      </BookDialog>
    </div>
  )
}

const BookPanel = styled(Panel)`
  margin-bottom: ${px2vw(45)};
  padding: ${px2vw(35)} ${px2vw(40)};
  ${borderRadius}
  ${boxShadow}
`

const BookCard = styled.div`
  .cover-image {
    ${borderRadius}
    ${boxShadow}
  }
  .content {
    padding-top: ${px2vw(16)};
    text-align: center;
  }
`

const BookDialog = styled(Dialog)`
  width: ${px2vw(1000)} !important;
  height: ${px2vw(600)};
  top: ${px2vw(200)};
`

const BookDetail = styled.div`
  flex: auto;
  display: flex;
  align-items: center;

  .wrapper {
    flex: auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .cover-image {
    flex: 0 0 ${px2vw(260)};
    height: ${px2vw(320)};
    ${borderRadius}
    ${boxShadow}
  }
  .content {
    margin-left: ${px2vw(60)};
    font-size: ${(props: ThemeProps) => props.theme.font.lg};
    .title {
      margin-bottom: ${px2vw(10)};
      font-size: ${(props: ThemeProps) => props.theme.font.xl};
      line-height: 1.4;
    }
    .desc {
      margin-bottom: ${px2vw(50)};
      color: #777;
    }
    .btn {
      padding: 1rem 2rem;
      background: linear-gradient(
        80deg,
        ${rgba('#59a4e0', 1)} 0%,
        ${rgba('#8de1eb', 1)} 100%
      );
      border-radius: ${px2vw(8)};
      text-align: center;
      color: #fff;
      text-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
      ${boxShadow}
    }
  }
`

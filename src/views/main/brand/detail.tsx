import _ from 'lodash'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dialog } from '../../../components/dialog/Dialog'
import { FlexGrid } from '../../../components/grid/FlexGrid'
import { FlexScrollWrapper } from '../../../components/grid/FlexScrollWrapper'
import { Loading } from '../../../components/Loading'
import { CoverImage } from '../../../components/media/CoverImage'
import { Tabs, TabsProps } from '../../../components/Tabs'
import { ArrowHeader } from '../../../components/text/ArrowHeader'
import { TextEllipsis } from '../../../components/text/TextEllipsis'
import { useDialogContext } from '../../../hooks/useDialogContext'
import { usePageModule } from '../../../hooks/usePageModule'
import { borderRadius, boxShadow } from '../../../styles/theme'
import { Channel, ModuleArticles } from '../../../typing'

export const BrandDetail: FC<{
  visible: boolean
  data: Channel
  onCancel: () => void
}> = props => {
  const { visible, data, onCancel } = props

  const { loading, pageModule } = usePageModule(data.id)
  const { openDialog } = useDialogContext()

  // tab
  const [tabs, setTabs] = useState<TabsProps['tabs']>([])
  useEffect(() => {
    if (pageModule?.modules) {
      setTabs(
        pageModule.modules.map(m => ({
          key: m.channel.id,
          label: m.channel.name
        }))
      )
      setActiveModule(_.first(pageModule.modules))
    } else {
      setTabs([])
      setActiveModule(undefined)
    }
  }, [pageModule])

  const [activeModule, setActiveModule] = useState<ModuleArticles>()

  function setActiveModuleByChannel(id: number) {
    const matched = _.find(pageModule?.modules, m => m.channel.id === id)
    setActiveModule(matched)
  }
  //

  function onArticleClick(data) {
    openDialog(data)
  }

  return (
    <Dialog visible={visible} onCancel={onCancel}>
      <FlexScrollWrapper>
        {loading && <Loading />}

        {!loading && tabs.length && (
          <div>
            <Tabs
              tabs={tabs}
              activeKey={activeModule?.channel.id}
              onClick={key => setActiveModuleByChannel(key)}
            />
          </div>
        )}

        {!loading && activeModule && (
          <FlexGrid span={1 / 3} gutter={[40, 40]}>
            {activeModule.articles.map(article => (
              <ArticleItem
                key={article.id}
                onClick={() => onArticleClick(article)}
              >
                <ArrowHeader>
                  <TextEllipsis>{article.listTitle}</TextEllipsis>
                </ArrowHeader>
                <CoverImage url={article.thumbnail} height={300} />
              </ArticleItem>
            ))}
          </FlexGrid>
        )}
      </FlexScrollWrapper>
    </Dialog>
  )
}

const ArticleItem = styled.div`
  .arrow-header {
    margin-bottom: 10px;
  }
  .cover-image {
    ${borderRadius}
    ${boxShadow}
  }
`

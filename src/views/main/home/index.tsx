import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { FlexGrid } from '../../../components/grid/FlexGrid'
import { ArticleItem } from '../../../components/list/article/ArticleItem'
import { CoverImage } from '../../../components/media/CoverImage'
import { Swiper } from '../../../components/media/Swiper'
import { useDialogContext } from '../../../hooks/useDialogContext'
import { usePageModule } from '../../../hooks/usePageModule'
import { Article } from '../../../typing'
import { Panel } from '../../shared/Panel'

export const HomePage = () => {
  const { openDialog } = useDialogContext()
  const { loading, pageModule, findModuleArticles } = usePageModule()

  const [swiperItems, setSwiperItems] = useState<Article[]>([])
  useEffect(() => {
    setSwiperItems(findModuleArticles('推荐大图'))
  }, [findModuleArticles])

  if (loading || !pageModule) {
    return <Spin />
  }

  return (
    <div>
      {!!swiperItems.length && (
        <Panel>
          <Swiper
            items={swiperItems}
            renderItem={data => <CoverImage url={data.thumbnail} />}
            onClick={() => {}}
          />
        </Panel>
      )}

      <Panel>
        <FlexGrid gutter={[40, 40]} span={1 / 5}>
          {pageModule.articles.map(article => (
            <ArticleItem
              key={article.id}
              thumb={article.thumbnail}
              title={article.title}
              thumbHeight={180}
              onClick={() => openDialog('article', article)}
            />
          ))}
        </FlexGrid>
      </Panel>
    </div>
  )
}

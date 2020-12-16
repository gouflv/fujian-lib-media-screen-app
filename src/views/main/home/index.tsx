import {Spin} from 'antd'
import {FlexGrid} from '../../../components/grid/FlexGrid'
import {ArticleItem} from '../../../components/list/article/ArticleItem'
import {usePageModule} from '../../../hooks/usePageModule'
import {Panel} from '../../shared/Panel'

export const HomePage = () => {

  const { loading, pageModule } = usePageModule()

  if (loading || !pageModule) {
    return <Spin />
  }

  return (
    <div>

      <Panel>
        <FlexGrid gutter={[40, 40]} span={1/5}>
          {pageModule.articles.map(article => (
            <ArticleItem
              thumb={article.thumbnail}
              title={article.title}
              thumbHeight={180}
            />
          ))}
        </FlexGrid>
      </Panel>

    </div>
  )
}

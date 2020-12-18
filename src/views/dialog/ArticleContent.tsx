import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { request } from '../../api'
import { FlexScrollWrapper } from '../../components/grid/FlexScrollWrapper'
import { Loading } from '../../components/Loading'
import { Article } from '../../components/text/Article'
import { ArticleHeader } from '../../components/text/ArticleHeader'
import { useDialogContext } from '../../hooks/useDialogContext'
import { Article as T, DOCType } from '../../typing'
import { autoUnsubscribe } from '../../utils/autoUnsubscribe'
import { dateFormat } from '../../utils/format'

export const ArticleContent = () => {
  const { data } = useDialogContext()

  const [article, set] = useState(() => data as T)
  useEffect(() => {
    set(data)
  }, [data])

  const type = article.docType

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<string>('')

  useEffect(() => {
    setLoading(true)

    return autoUnsubscribe(
      request.get(article._meta.contentUrl).subscribe(res => {
        setDetail(res.htmlContent)
        setLoading(false)
      })
    )
  }, [article])

  if (loading) {
    return <Loading />
  }

  return (
    <FlexScrollWrapper>
      <ArticleWrapper>
        <ArticleHeader center>
          <div className='title'>{article.title}</div>
          {type === DOCType.NEWS && (
            <div className='desc'>
              {article._meta.metaInfo.source && (
                <>
                  {article._meta.metaInfo.source}
                  <span>|</span>
                </>
              )}
              {dateFormat(article._meta.metaInfo.docPubTime)}
            </div>
          )}
        </ArticleHeader>

        <main className='body'>
          {type === DOCType.NEWS && (
            <Article dangerouslySetInnerHTML={{ __html: detail }} />
          )}
        </main>
      </ArticleWrapper>
    </FlexScrollWrapper>
  )
}

const ArticleWrapper = styled.section``

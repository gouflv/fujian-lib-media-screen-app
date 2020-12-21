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

  const article = data as T
  const type = article.docType

  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<string>('')

  useEffect(() => {
    setLoading(true)

    if (article.docType === DOCType.NEWS) {
      return autoUnsubscribe(
        request.get(article._meta.contentUrl).subscribe(res => {
          setDetail(res.htmlContent)
          setLoading(false)
        })
      )
    }

    if (article.docType === DOCType.ACTIVITY) {
      setDetail(article._meta.metaInfo.activeDoc.htmlContent)
      setLoading(false)
    }
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
          <Article html={detail} />
        </main>
      </ArticleWrapper>
    </FlexScrollWrapper>
  )
}

const ArticleWrapper = styled.section``

import styled from 'styled-components'
import { FlexScrollWrapper } from '../../components/grid/FlexScrollWrapper'
import { Video } from '../../components/media/Video'
import { Article } from '../../components/text/Article'
import { ArticleHeader } from '../../components/text/ArticleHeader'
import { useDialogContext } from '../../hooks/useDialogContext'
import { ThemeProps } from '../../styles/theme'
import { px2vw } from '../../styles/utils'
import { Article as T } from '../../typing'

export const MediaContent = () => {
  const { data } = useDialogContext()

  const article = data as T

  return (
    <FlexScrollWrapper>
      <ArticleHeader>
        <div className='title'>{article.title}</div>
      </ArticleHeader>

      <MediaWrapper>
        <Video url={article._meta.metaInfo.linkDoc} />
        <div className='content'>
          <div className='title'>简介</div>
          <Article
            dangerouslySetInnerHTML={{
              __html: article._meta.metaInfo.videoDoc.htmlContent
            }}
          />
        </div>
      </MediaWrapper>
    </FlexScrollWrapper>
  )
}

const MediaWrapper = styled.main`
  flex: auto;
  display: flex;
  min-height: 0;

  .video {
    flex: auto;
  }

  .content {
    flex: 0 0 ${px2vw(420)};
    padding: 0 ${px2vw(40)};
    min-height: 0;
    overflow-y: auto;

    .title {
      font-size: ${(props: ThemeProps) => props.theme.font.xl};
    }

    article {
      padding: 0;
    }
  }
`

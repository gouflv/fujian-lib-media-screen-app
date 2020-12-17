import {FC} from 'react'
import styled from 'styled-components'
import {borderRadius, boxShadow} from '../../../styles/theme'
import {px2vw} from '../../../styles/utils'
import {CoverImage} from '../../media/CoverImage'
import {TextEllipsis} from '../../text/TextEllipsis'

export const ArticleItemBox = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  ${boxShadow}
  ${borderRadius}

  .content {
    padding: ${px2vw(16)};
  }
`

export const ArticleItem: FC<{
  thumb: string
  thumbHeight?: number
  title?: string
}> = props => {
  return (
    <ArticleItemBox className='article-item'>
      <CoverImage url={props.thumb} height={props.thumbHeight || 180} />
      {props.title && (
        <div className='content'>
          <TextEllipsis className='title'>{props.title}</TextEllipsis>
        </div>
      )}
    </ArticleItemBox>
  )
}

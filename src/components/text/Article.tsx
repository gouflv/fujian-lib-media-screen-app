import { FC, memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { px2vw } from '../../styles/utils'

export const Article: FC<{ html: string; fontSize?: number }> = memo(props => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (ref.current) {
      const el = ref.current.querySelectorAll('img[onclick]')
      el.forEach(e => e.removeAttribute('onclick'))
    }
  }, [props.html])

  return (
    <StyledArticle
      ref={ref}
      dangerouslySetInnerHTML={{ __html: props.html }}
      {...props}
    />
  )
})

export const StyledArticle = styled.article<{ fontSize?: number }>`
  max-width: 40em;
  margin: auto;
  font-size: ${props => px2vw(props.fontSize || 28)} !important;
  color: #333 !important;

  p {
    margin: 1rem 0 !important;
    font-size: ${props => px2vw(props.fontSize || 28)} !important;
    line-height: 1.8 !important;
    text-align: justify !important;
  }

  img {
    border-radius: 4px;
  }

  p > img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`

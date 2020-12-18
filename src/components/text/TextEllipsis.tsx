import styled from 'styled-components'

export const TextEllipsis = props => {
  const { line, ...rest } = props
  return line && line > 1 ? (
    <TextEllipsisMulti line={line} {...rest} />
  ) : (
    <TextEllipsisNormal {...rest} />
  )
}

export const TextEllipsisNormal = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const TextEllipsisMulti = styled.div<{ line: number }>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.line || 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

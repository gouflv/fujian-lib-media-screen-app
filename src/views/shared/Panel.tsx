import {FC} from 'react'
import styled from 'styled-components'
import {px2vw} from '../../styles/utils'

interface PanelProps {
  header?: string
}
export const Panel: FC<PanelProps> = (props) => (
  <Section className='panel'>
    {props.header && (
      <div className='header'>
        {props.header}
      </div>
    )}
    <div className='body'>
      {props.children}
    </div>
  </Section>
)

const Section = styled.section`
  margin-bottom: ${px2vw(45)};
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 auto;
    margin-bottom: ${px2vw(20)};
    line-height: 1.15;
  }

  .body {
    flex: auto;
  }
`

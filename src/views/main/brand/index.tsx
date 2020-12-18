import img0 from '../../../assets/brand00.png'
import { useMemo } from 'react'
import styled from 'styled-components'
import { FlexGrid } from '../../../components/grid/FlexGrid'
import { ArrowHeader } from '../../../components/text/ArrowHeader'
import { useChannelContext } from '../../../hooks/useChannelContext'
import { borderRadius, boxShadow } from '../../../styles/theme'
import { Panel } from '../../shared/Panel'

const BreadNames = [
  { name: '全福游有全福' },
  { name: '东南周末讲坛', img: require('../../../assets/brand01.png') },
  // { name: '福建文化记忆', img: require('../../../assets/brand02.png') },
  { name: '“读吧，福建！”', img: require('../../../assets/brand02.png') },
  { name: '正谊学堂', img: require('../../../assets/brand03.png') },
  { name: '非遗博览苑', img: require('../../../assets/brand04.png') },
  { name: '艺术扶贫', img: require('../../../assets/brand05.png') },
  { name: '农民漆画', img: require('../../../assets/brand06.png') }
]

export const Brand = () => {
  const { currentChannel } = useChannelContext()

  const items = useMemo(() => {
    if (currentChannel[0] && currentChannel[0].children) {
      return currentChannel[0].children
    }
    return []
  }, [currentChannel])

  return (
    <div>
      <TopPanel>
        <div className='main'></div>
        <div className='intro'>
          <div className='header'>全福游有全福</div>
          <div className='body'>
            <div className='title'>关于品牌</div>
            <p>
              打造“全福游、有全福”品牌是省委、省政府站在文化和旅游深度融合新时代背景下，充分发挥清新福建和快速铁路环线优势，深入挖掘生态福建、“清新福建”内涵作出的重要工作部署。“全福游、有全福”品牌，凸显福建作为全国唯一以“福”字命名省份的独特性，全方位展示了福建多彩多元的文化，特别是福文化的独特魅力，准确反映了我省文化和旅游的本质特征，敏锐地把握了人民群众对美好生活的向往这一新时代主题；深刻宣誓和引领进入新时代的价值观导向。
            </p>
          </div>
        </div>
      </TopPanel>

      <Panel>
        <ArrowHeader>更多品牌</ArrowHeader>

        <FlexGrid span={1 / 6} gutter={[20, 0]}>
          <BrandItem>
            <Image url={''} />
            <div className='title'></div>
          </BrandItem>
        </FlexGrid>
      </Panel>
    </div>
  )
}

const TopPanel = styled.div`
  display: flex;
  height: 360px;
  margin-bottom: 40px;
  .main {
    flex: 0 0 890px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${img0});
    ${borderRadius}
    ${boxShadow}
  }
  .intro {
    position: relative;
    margin-top: 26px;
    flex: auto;
    margin-left: 60px;
    border: 1px solid #6b513f;
    ${borderRadius}
    .header {
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 364px;
      height: 52px;
      background-image: url(~@/assets/brand-h-bg.png);
      background-size: contain;
      background-repeat: no-repeat;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .body {
      padding: 50px 30px 20px;
      .title {
        text-align: center;
      }
    }
  }
`

const BrandItem = styled.div``

const Image = styled.div<{ url }>`
  background-image: ${props => props.url};
`

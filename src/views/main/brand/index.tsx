import _ from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import imgBg from '../../../assets/brand-bg.png'
import imgH from '../../../assets/brand-h-bg.png'
import img0 from '../../../assets/brand00.png'
import { FlexGrid } from '../../../components/grid/FlexGrid'
import { ArrowHeader } from '../../../components/text/ArrowHeader'
import { useChannelContext } from '../../../hooks/useChannelContext'
import {
  bgContain,
  bgCover,
  borderRadius,
  boxShadow,
  ThemeProps
} from '../../../styles/theme'
import { Channel } from '../../../typing'
import { Panel } from '../../shared/Panel'
import { BrandDetail } from './detail'

const BrandNames = [
  { name: '全福游有全福' },
  { name: '东南周末讲坛', img: require('../../../assets/brand01.png').default },
  // { name: '福建文化记忆', img: require('../../../assets/brand02.png').default },
  {
    name: '“读吧，福建！”',
    img: require('../../../assets/brand02.png').default
  },
  { name: '正谊学堂', img: require('../../../assets/brand03.png').default },
  { name: '非遗博览苑', img: require('../../../assets/brand04.png').default },
  { name: '艺术扶贫', img: require('../../../assets/brand05.png').default },
  { name: '农民漆画', img: require('../../../assets/brand06.png').default }
]

export const Brand = () => {
  const { currentChannel } = useChannelContext()

  const items = useMemo(() => {
    if (currentChannel[0] && currentChannel[0].children) {
      return currentChannel[0].children
    }
    return []
  }, [currentChannel])

  function getListItems() {
    return (
      _.map(_.tail(BrandNames), ({ name, img }) => ({
        ..._.find(items, { name }),
        img
      })).filter(b => b.name) || []
    )
  }

  const [detailVisible, setDetailVisible] = useState(false)
  const [detailData, setDetailData] = useState<Channel>()
  function onClick(item: Channel) {
    setDetailData(item)
    setDetailVisible(true)
  }

  return (
    <div>
      <TopPanel>
        <div className='main' onClick={() => onClick(items[0])} />
        <div className='intro'>
          <div className='header'>全福游有全福</div>
          <div className='body'>
            <div>
              <div className='center'>关于品牌</div>
              <p>
                打造“全福游、有全福”品牌是省委、省政府站在文化和旅游深度融合新时代背景下，充分发挥清新福建和快速铁路环线优势，深入挖掘生态福建、“清新福建”内涵作出的重要工作部署。“全福游、有全福”品牌，凸显福建作为全国唯一以“福”字命名省份的独特性，全方位展示了福建多彩多元的文化，特别是福文化的独特魅力，准确反映了我省文化和旅游的本质特征，敏锐地把握了人民群众对美好生活的向往这一新时代主题；深刻宣誓和引领进入新时代的价值观导向。
              </p>
            </div>
          </div>
        </div>
      </TopPanel>

      <Panel>
        <ArrowHeader>更多品牌</ArrowHeader>
        <FlexGrid span={1 / 6} gutter={[20, 0]}>
          {getListItems().map((item, i) => (
            <BrandItem key={i} onClick={() => onClick(item as Channel)}>
              <Image className='img' url={item.img} />
              <div className='title'>{item.name}</div>
            </BrandItem>
          ))}
        </FlexGrid>
      </Panel>

      {detailData && (
        <BrandDetail
          visible={detailVisible}
          data={detailData}
          onCancel={() => setDetailVisible(false)}
        />
      )}
    </div>
  )
}

const TopPanel = styled.div`
  display: flex;
  height: 360px;
  margin-bottom: 40px;
  .main {
    flex: 0 0 890px;
    background-image: url(${img0});
    ${bgCover}
    ${borderRadius}
    ${boxShadow}
  }
  .intro {
    position: relative;
    margin-top: 26px;
    flex: auto;
    margin-left: 60px;
    border: 1px solid #6b513f;
    border-radius: ${(props: ThemeProps) => props.theme.border.radius};
    .header {
      position: absolute;
      margin-left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 364px;
      height: 52px;
      background-image: url(${imgH});
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 22px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .body {
      flex: auto;
      padding: 50px 30px 20px;
      font-size: 22px;
      .center {
        margin-bottom: 8px;
        line-height: 1.4;
        text-align: center;
      }
    }
  }
`

const BrandItem = styled.div`
  height: 370px;
  padding: 50px 26px 24px;
  display: flex;
  flex-direction: column;
  background-image: url(${imgBg});
  ${bgCover}
  ${borderRadius}
  ${boxShadow}

  .img {
    margin-bottom: 30px;
    flex: auto;
  }

  .title {
    text-align: center;
    font-weight: bold;

    &::before {
      content: '';
      margin: 0 auto 14px;
      display: block;
      width: 18px;
      height: 18px;
      border: 1px solid #333;
      border-radius: 100%;
    }
  }
`

const Image = styled.div<{ url }>`
  background-image: url(${props => props.url});
  ${bgContain}
`

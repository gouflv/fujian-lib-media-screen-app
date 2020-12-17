import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper'
import { Swiper as _Swiper, SwiperSlide } from 'swiper/react'
import { borderRadius } from '../../styles/theme'
import { px2vw } from '../../styles/utils'
import { Article } from '../../typing'

SwiperCore.use([Autoplay, EffectCoverflow])

export const Swiper: FC<{
  items: Article[]
  onClick: (item: Article) => void
  renderItem: (data: Article) => ReactNode
}> = props => {
  function onClick(_, index) {
    props.onClick(props.items[index])
  }

  return (
    <StyledSwiper
      loop={true}
      centeredSlides={true}
      slideToClickedSlide={true}
      slidesPerView={2}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 0,
        depth: (document.body.clientWidth / 1280) * 400
      }}
      autoplay={{ delay: 6000 }}
      onClick={onClick}
    >
      {props.items.map(item => (
        <SwiperSlide key={item.id}>{props.renderItem(item)}</SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

const StyledSwiper = styled(_Swiper)`
  flex: 0 0 auto;

  .swiper-slide {
    display: flex;
    position: relative;
    width: ${px2vw(890)};
    height: ${px2vw(390)};
    background: #f4f4f4;
    ${borderRadius}
  }
`

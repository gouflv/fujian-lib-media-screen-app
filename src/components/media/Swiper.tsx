import {FC, ReactNode} from 'react'
import styled from 'styled-components'
import SwiperCore, {Autoplay, EffectFade} from 'swiper'
import {Swiper as _Swiper, SwiperSlide} from 'swiper/react'
import {borderRadius} from '../../styles/theme'
import {Article} from '../../typing'

SwiperCore.use([Autoplay, EffectFade])

const StyledSwiper = styled(_Swiper)`
  flex: 0 0 auto;

  .swiper-slide {
    position: relative;
    width: 890px;
    height: 390px;
    background: #f4f4f4;
    ${borderRadius}
  }
`

export const Swiper: FC<{
  items: Article[],
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
        <SwiperSlide key={item.id}>
          {props.renderItem(item)}
        </SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

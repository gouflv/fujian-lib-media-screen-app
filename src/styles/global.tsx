import 'antd/dist/antd.css'
import { createGlobalStyle } from 'styled-components'
import 'swiper/swiper-bundle.css'
import 'video.js/dist/video-js.css'
import { px2vw } from './utils'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    outline: none;
  }

  html {
    font-size: ${px2vw(20)};
  }

  body {
    /* font-family: Droid Serif, SimSun, serif; */
    font-size: ${px2vw(20)};
    color: #333;
  }

  ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    vertical-align: middle;
    max-width: 100% !important;
  }

  video {
    display: block;
    width: 100%;
    max-width: 100%;
  }
`

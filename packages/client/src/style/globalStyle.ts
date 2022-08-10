import { createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'
import { media } from '../style/theme'

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap");
  @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300;400&display=swap');

  * {
    font-family: 'Gothic A1', sans-serif !important;
    box-sizing: border-box;
  }


  body {
    line-height: 1.5;

    ${media.PC} {
      font-size: 15px;
    }

    ${media.TABLET} {
      font-size: 15px;
    }

    ${media.MOBILE} {
      font-size: 10px;
    }
  }

  ${reset}
`

export default GlobalStyle

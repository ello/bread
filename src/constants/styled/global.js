// global base styles ---------------------------------------------------------------------------
// css that can be safely applied site-wide
// this is not the same as globally-available mixin helpers

import { injectGlobal } from 'styled-components'
import { colors } from './colors'
import { ff, fs, link } from './font_stack'

/* eslint no-unused-expressions: 0 */
injectGlobal`
  /* reset ----------------------------------------------------------------------------------------- */
  /* stylelint-disable */
  html {
    font: normal 400 100% / 1.5 ${ff.regular.family};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  button {
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    &:active,
    &:focus {
      outline: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  /* stylelint-enable */

  /* common global --------------------------------------------------------------------------------- */

  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    background-color: ${colors.offBlack};
  }

  #root {
    min-height: 100%;
    min-width: 100%;
  }

  svg,
  img {
    display: block;
    width: 100%;
  }

  /* typography defaults --------------------------------------------------------------------------- */

  body {  /* stylelint-disable-line no-duplicate-selectors */
    ${ff.regular.full}
    font-size: 16px;
    font-weight: 400;
    line-height: 1;
    color: ${colors.white};
  }

  ::selection {
    background: ${colors.offWhite};
    color: ${colors.black};
    text-shadow: none;
  }

  /* default link styling by mixin */
  ${link.standard.package}

  p,
  label,
  ul,
  ol {
    ${fs.body.size}
    ${ff.regular.full}
  }

  code {
    ${ff.mono.full}
    font-size: 90%;
    font-weight: 400;
  }

  strong > code {
    font-weight: 700;
  }

  p > code,
  li > code,
  h1 > code,
  h2 > code,
  h3 > code,
  h4 > code,
  h5 > code,
  h6 > code, {
    margin-bottom: 0;
  }

  strong, b {
    font-weight: 700;
  }

  em, i {
    font-style: italic;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    line-height: 1.4;

    &.subtitle {
      font-weight: 500;
    }
  }

  h1 {
    ${fs.h1.size}

    &.margin {
      ${fs.h1.marginBottom}
    }
  }

  h2 {
    ${fs.h2.size}

    &.margin {
      ${fs.h2.marginBottom}
    }
  }

  h3 {
    ${fs.h3.size}

    &.margin {
      ${fs.h3.marginBottom}
    }
  }

  h4 {
    ${fs.h4.size}

    &.margin {
      ${fs.h4.marginBottom}
    }
  }

  h5 {
    ${fs.h5.size}

    &.margin {
      ${fs.h5.marginBottom}
    }
  }

  h6 {
    ${fs.h6.size}

    &.margin {
      ${fs.h6.marginBottom}
    }
  }

  small {
    font-size: 70%;
  }

  p > small {
    ${fs.small.size}
  }
`

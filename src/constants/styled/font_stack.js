// global typography definitions ----------------------------------------------------------------
// changing the type stack or sizing here changes it site-wide

import { css } from 'styled-components'
import { colors } from './colors'
import { em } from './mixins'

// load fonts -----------------------------------------

export const fonts = css`
  /* stylelint-disable */
  @font-face {
    font-family: AtlasGroteskRegular;
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
    src:
      local('AtlasGrotesk-Regular'),
      url('//fonts.ello.co/AtlasGrotesk-Regular-Web.eot?#iefix') format('embedded-opentype'),
      url('//fonts.ello.co/AtlasGrotesk-Regular-Web.woff') format('woff'),
      url('//fonts.ello.co/AtlasGrotesk-Regular-Web.ttf') format('truetype'),
      url('//fonts.ello.co/AtlasGrotesk-Regular-Web.svg#AtlasGroteskRegular') format('svg');
  }

  @font-face {
    font-family: AtlasGroteskBold;
    font-style: normal;
    font-weight: 700;
    font-stretch: normal;
    src:
      local('AtlasGrotesk-Bold'),
      url('//fonts.ello.co/AtlasGrotesk-Bold-Web.eot?#iefix') format('embedded-opentype'),
      url('//fonts.ello.co/AtlasGrotesk-Bold-Web.woff') format('woff'),
      url('//fonts.ello.co/AtlasGrotesk-Bold-Web.ttf') format('truetype'),
      url('//fonts.ello.co/AtlasGrotesk-Bold-Web.svg#AtlasGroteskBold') format('svg');
  }

  @font-face {
    font-family: AtlasGroteskBlack;
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
    src:
      local('AtlasGrotesk-Black'),
      url('//fonts.ello.co/AtlasGrotesk-Black-Web.eot?#iefix') format('embedded-opentype'),
      url('//fonts.ello.co/AtlasGrotesk-Black-Web.woff') format('woff'),
      url('//fonts.ello.co/AtlasGrotesk-Black-Web.ttf') format('truetype'),
      url('//fonts.ello.co/AtlasGrotesk-Black-Web.svg#AtlasGroteskBlack') format('svg');
  }

  @font-face {
    font-family: AtlasGroteskLight;
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
    src:
      local('AtlasGrotesk-Light'),
      url('//fonts.ello.co/AtlasGrotesk-Light-Web.eot?#iefix') format('embedded-opentype'),
      url('//fonts.ello.co/AtlasGrotesk-Light-Web.woff') format('woff'),
      url('//fonts.ello.co/AtlasGrotesk-Light-Web.ttf') format('truetype'),
      url('//fonts.ello.co/AtlasGrotesk-Light-Web.svg#AtlasGroteskLight') format('svg');
  }

  @font-face {
    font-family: AtlasTypewriterRegular;
    font-style: normal;
    font-weight: 400;
    font-stretch: normal;
    src:
      local('AtlasTypewriter-Regular'),
      url('//fonts.ello.co/AtlasTypewriter-Regular-Web.eot?#iefix') format('embedded-opentype'),
      url('//fonts.ello.co/AtlasTypewriter-Regular-Web.woff') format('woff'),
      url('//fonts.ello.co/AtlasTypewriter-Regular-Web.ttf') format('truetype'),
      url('//fonts.ello.co/AtlasTypewriter-Regular-Web.svg#AtlasTypewriterRegular') format('svg');
  }
  /* stylelint-enable */
`

export const typeface = {
  regular: '"AtlasGroteskRegular", "AtlasGrotesk-Regular", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif',
  bold: '"AtlasGroteskBold", "AtlasGrotesk-Bold", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif',
  black: '"AtlasGroteskBlack", "AtlasGrotesk-Black", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif',
  light: '"AtlasGroteskLight", "AtlasGrotesk-Light", "Helvetica Neue", "HelveticaNeue", "Helvetica", sans-serif',
  mono: '"AtlasTypewriterRegular", "AtlasTypewriter-Regular", "Andale Mono", "Consolas", "Lucida Console", "Menlo", "Luxi Mono", monospace',
}

// font families --------------------------------------
function weight(family, style, weight) {
  const fullPackage = {
    full: css`
    font-family: ${family};
    font-style: ${style};
    font-weight: ${weight};
  `,
    family: css`
    font-family: ${family};
  `,
    style: css`
    font-style: ${style};
  `,
    weight: css`
    font-weight: ${weight};
  `,
  }
  return fullPackage
}

const typeRegular = weight(typeface.regular, 'normal', 400)
const typeItalic = weight(typeface.regular, 'italic', 400)
const typeBold = weight(typeface.bold, 'normal', 700)
const typeBoldItalic = weight(typeface.bold, 'italic', 700)
const typeBlack = weight(typeface.black, 'normal', 400)
const typeLight = weight(typeface.light, 'normal', 400)
const typeMono = weight(typeface.mono, 'normal', 400)

export const ff = {
  regular: typeRegular,
  italic: typeItalic,
  bold: typeBold,
  boldItalic: typeBoldItalic,
  black: typeBlack,
  light: typeLight,
  mono: typeMono,
}

// font size packages ---------------------------------
function sizingPackage(baseSize, lineHeight, marginBottom) {
  const fullPackage = {
    size: css`
    font-size: ${em(baseSize)};
    line-height: ${lineHeight};
  `,
    sizeMargin: css`
    margin-bottom: ${em(marginBottom)};
    font-size: ${em(baseSize)};
    line-height: ${lineHeight};
  `,
    marginBottom: css`
    margin-bottom: ${em(marginBottom)};
  `,
    lineHeight: css`
    line-height: ${lineHeight};
  `,
    base: css`
    font-size: ${em(baseSize)};
  `,
  }
  return fullPackage
}

const small = sizingPackage(11, 1.5, (11 * 1.5))
const body = sizingPackage(14, 1.5, (16 * 1.5))
const h1 = sizingPackage(64, 1.2, 64)
const h2 = sizingPackage(48, 1.3, 48)
const h3 = sizingPackage(38, 1.2, 36)
const h4 = sizingPackage(22, 1.4, 24)
const h5 = sizingPackage(18, 1.4, (20 * 1.4))
const h6 = sizingPackage(16, 1.5, (16 * 1.4))

export const fs = {
  small: small,
  body: body,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
}

// link package ---------------------------------------
function builtLinkPackage(baseColor, hoverColor, activeColor) {
  const fullPackage = {
    package: css`
    a,
    a:visited {
      color: ${baseColor};
      transition: color 0.2s ease;
      text-decoration: none;

      &:hover {
        color: ${hoverColor};
        text-decoration: underline;
      }

      &:active {
        color: ${activeColor};
        text-decoration: none;
      }
    }
  `,
    baseColor: css`
    color: ${baseColor};
  `,
    baseColorValue: baseColor,
    hoverColor: css`
    color: ${hoverColor};
  `,
    hoverColorValue: hoverColor,
    activeColor: css`
    color: ${activeColor};
  `,
    activeColorValue: activeColor,
  }
  return fullPackage
}

const linkStandard = builtLinkPackage(colors.white, colors.offWhite, colors.offWhite)
const linkSubtle = builtLinkPackage(colors.mediumGrey, colors.grey, colors.white)
const linkBlack = builtLinkPackage(colors.black, colors.blue, colors.darkBlue)
const linkInherit = builtLinkPackage('inherit', 'inherit', 'inherit')

export const link = {
  standard: linkStandard,
  subtle: linkSubtle,
  inherit: linkInherit,
  black: linkBlack,
}

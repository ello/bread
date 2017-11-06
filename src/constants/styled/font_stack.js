// global typography definitions ----------------------------------------------------------------
// changing the type stack or sizing here changes it site-wide

import { css } from 'styled-components'
import { colors } from './colors'
import { em } from './mixins'

// font families --------------------------------------
export const ff = {
  base: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif',
  code: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  serif: 'Georgia, Times, "Times New Roman", serif',
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

const small = sizingPackage(12, 1.5, (12 * 1.5))
const body = sizingPackage(16, 1.5, (16 * 1.5))
const h1 = sizingPackage(64, 1.2, 64)
const h2 = sizingPackage(48, 1.3, 48)
const h3 = sizingPackage(36, 1.2, 36)
const h4 = sizingPackage(24, 1.4, 24)
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

      &:hover {
        color: ${hoverColor};
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

const standard = builtLinkPackage(colors.white, colors.offWhite, colors.offWhite)
const subtle = builtLinkPackage(colors.grey, colors.mediumGrey, colors.white)
const black = builtLinkPackage(colors.black, colors.blue, colors.darkBlue)
const inherit = builtLinkPackage('inherit', 'inherit', 'inherit')

export const link = {
  standard: standard,
  subtle: subtle,
  inherit: inherit,
  black: black,
}
